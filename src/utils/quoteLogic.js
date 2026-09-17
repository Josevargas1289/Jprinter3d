import { DEFAULT_FORM, MARKET_ASSUMPTIONS, MATERIALS } from '../constants/materials';
import { ceilTo, formatDateTime, parseNumber } from './format';

const complexityMultiplier = {
  simple: 0.9,
  medium: 1,
  complex: 1.22,
};

const printModeMultiplier = {
  speed: 0.9,
  standard: 1,
  detail: 1.16,
  premium: 1.32,
};

const volumeDiscountByQuantity = [
  { min: 30, discount: 0.18 },
  { min: 12, discount: 0.12 },
  { min: 5, discount: 0.07 },
  { min: 1, discount: 0 },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getVolumeDiscount(quantity) {
  return volumeDiscountByQuantity.find((tier) => quantity >= tier.min)?.discount ?? 0;
}

export function calculateQuote({ form, savedAt = Date.now() }) {
  const safeForm = { ...DEFAULT_FORM, ...form };
  const materialMeta = MATERIALS[safeForm.materialType] || MATERIALS.PLA;

  const rollPrice = parseNumber(safeForm.rollPrice, materialMeta.marketRollPrice);
  const rollWeight = Math.max(parseNumber(safeForm.rollWeight, 1000), 1);
  const usedGrams = Math.max(parseNumber(safeForm.usedGrams), 0);
  const printHours = Math.max(parseNumber(safeForm.printHours), usedGrams > 0 ? 0.1 : 0);
  const printerPower = Math.max(parseNumber(safeForm.printerPower, materialMeta.watts), 0);
  const kwhPrice = Math.max(parseNumber(safeForm.kwhPrice, MARKET_ASSUMPTIONS.kwhPrice), 0);
  const machineHour = Math.max(parseNumber(safeForm.machineHour, MARKET_ASSUMPTIONS.machineHour), 0);
  const laborRate = Math.max(parseNumber(safeForm.laborRate, MARKET_ASSUMPTIONS.laborRate), 0);
  const setupMinutes = Math.max(parseNumber(safeForm.setupMinutes, 15), 0);
  const postProcessMinutes = Math.max(parseNumber(safeForm.postProcessMinutes, 12), 0);
  const extras = Math.max(parseNumber(safeForm.extras), 0);
  const targetMargin = clamp(parseNumber(safeForm.targetMargin, MARKET_ASSUMPTIONS.targetMargin), 12, 70) / 100;
  const quantity = Math.max(Math.round(parseNumber(safeForm.quantity, 1)), 1);
  const roundTo = parseNumber(safeForm.roundTo, 1000);
  const customPrice = parseNumber(safeForm.customPrice);
  const wastePercent = clamp(parseNumber(safeForm.wastePercent, materialMeta.wastePercent), 0, 45) / 100;
  const failureRate = clamp(parseNumber(safeForm.failureRate, materialMeta.failureRate), 0, 35) / 100;
  const infillDensity = clamp(parseNumber(safeForm.infillDensity, 18), 1, 100);
  const complexityFactor = complexityMultiplier[safeForm.modelComplexity] || 1;
  const modeFactor = printModeMultiplier[safeForm.printMode] || 1;
  const volumeDiscount = getVolumeDiscount(quantity);

  const costPerGram = rollPrice / rollWeight;
  const adjustedMaterialWeight = usedGrams * (1 + wastePercent);
  const materialCost = adjustedMaterialWeight * costPerGram;
  const energyKwh = (printerPower / 1000) * printHours;
  const energyCost = energyKwh * kwhPrice;
  const machineCost = machineHour * printHours;
  const laborMinutes = setupMinutes + postProcessMinutes + Math.max(printHours * 60 * 0.08, 4);
  const laborCost = laborRate * (laborMinutes / 60);
  const directCost = materialCost + energyCost + machineCost + laborCost + extras;
  const riskReserve = directCost * failureRate;
  const baseCost = directCost + riskReserve;

  const marketMaterialComponent = adjustedMaterialWeight * materialMeta.marketGramPrice;
  const marketTimeComponent = printHours * 60 * materialMeta.marketMinuteRate;
  const marketSetup = MARKET_ASSUMPTIONS.setupFee + extras * 0.65;
  const marketFactor = materialMeta.marketFactor * complexityFactor * modeFactor;
  const marketBenchmarkRaw = (marketMaterialComponent + marketTimeComponent + marketSetup) * marketFactor;
  const marketBenchmark = Math.max(marketBenchmarkRaw * (1 - volumeDiscount), MARKET_ASSUMPTIONS.minimumOrder);
  const profitablePrice = baseCost / (1 - targetMargin);
  const minimumPrice = ceilTo(Math.max(baseCost * 1.18, profitablePrice * 0.82, MARKET_ASSUMPTIONS.minimumOrder * 0.72), roundTo);
  const recommendedPrice = ceilTo(Math.max(profitablePrice, marketBenchmark, minimumPrice * 1.08), roundTo);
  const premiumPrice = ceilTo(Math.max(recommendedPrice * 1.2, baseCost / (1 - Math.min(targetMargin + 0.12, 0.78))), roundTo);

  const selectedUnitPrice =
    safeForm.priceType === 'minimum'
      ? minimumPrice
      : safeForm.priceType === 'premium'
        ? premiumPrice
        : safeForm.priceType === 'custom'
          ? ceilTo(Math.max(customPrice, 0), roundTo)
          : recommendedPrice;

  const selectedPriceLabel =
    safeForm.priceType === 'minimum'
      ? 'Mínimo rentable'
      : safeForm.priceType === 'premium'
        ? 'Precio premium'
        : safeForm.priceType === 'custom'
          ? 'Precio personalizado'
          : 'Precio recomendado';

  const totalQuote = selectedUnitPrice * quantity;
  const totalBaseCost = baseCost * quantity;
  const selectedProfit = selectedUnitPrice - baseCost;
  const effectiveMargin = selectedUnitPrice > 0 ? selectedProfit / selectedUnitPrice : 0;
  const competitivenessGap = marketBenchmark > 0 ? (selectedUnitPrice - marketBenchmark) / marketBenchmark : 0;
  const quoteDate = new Date(savedAt);
  const quoteDateLabel = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(quoteDate);
  const quoteNumber = `JP-${quoteDate.toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.round(savedAt)).slice(-4)}`;

  return {
    costPerGram,
    materialCost,
    adjustedMaterialWeight,
    energyKwh,
    energyCost,
    machineCost,
    laborMinutes,
    laborCost,
    riskReserve,
    directCost,
    baseCost,
    minimumPrice,
    recommendedPrice,
    premiumPrice,
    minimumProfit: minimumPrice - baseCost,
    recommendedProfit: recommendedPrice - baseCost,
    premiumProfit: premiumPrice - baseCost,
    selectedUnitPrice,
    selectedPriceLabel,
    selectedProfit,
    quantity,
    totalQuote,
    totalBaseCost,
    totalProfit: totalQuote - totalBaseCost,
    effectiveMargin,
    marketBenchmark,
    marketFactor,
    competitivenessGap,
    volumeDiscount,
    pricePerGram: adjustedMaterialWeight > 0 ? selectedUnitPrice / adjustedMaterialWeight : 0,
    materialMeta,
    lastSavedLabel: formatDateTime(savedAt),
    quoteDateLabel,
    quoteNumber,
  };
}
