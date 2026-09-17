import { DEFAULT_FORM, MATERIALS } from '../constants/materials';
import { ceilTo, formatDateTime, parseNumber } from './format';

export function calculateQuote({ form, savedAt = Date.now() }) {
  const safeForm = { ...DEFAULT_FORM, ...form };

  const rollPrice = parseNumber(safeForm.rollPrice);
  const rollWeight = Math.max(parseNumber(safeForm.rollWeight, 1), 1);
  const usedGrams = parseNumber(safeForm.usedGrams);
  const printHours = parseNumber(safeForm.printHours);
  const printerPower = parseNumber(safeForm.printerPower);
  const kwhPrice = parseNumber(safeForm.kwhPrice);
  const machineHour = parseNumber(safeForm.machineHour);
  const extras = parseNumber(safeForm.extras);
  const targetProfit = parseNumber(safeForm.targetProfit);
  const quantity = Math.max(parseNumber(safeForm.quantity, 1), 1);
  const roundTo = parseNumber(safeForm.roundTo, 500);
  const customPrice = parseNumber(safeForm.customPrice);

  const costPerGram = rollPrice / rollWeight;
  const materialCost = usedGrams * costPerGram;
  const energyKwh = (printerPower / 1000) * printHours;
  const energyCost = energyKwh * kwhPrice;
  const machineCost = machineHour * printHours;
  const baseCost = materialCost + energyCost + machineCost + extras;
  const targetProfitPerGram = targetProfit / rollWeight;
  const pieceMinProfit = targetProfitPerGram * usedGrams;

  const minimumPrice = ceilTo(baseCost + pieceMinProfit, roundTo);
  const recommendedPrice = ceilTo(minimumPrice * 1.1, roundTo);
  const premiumPrice = ceilTo(minimumPrice * 1.2, roundTo);

  const selectedUnitPrice =
    safeForm.priceType === 'minimum'
      ? minimumPrice
      : safeForm.priceType === 'premium'
        ? premiumPrice
        : safeForm.priceType === 'custom'
          ? ceilTo(customPrice, roundTo)
          : recommendedPrice;

  const selectedPriceLabel =
    safeForm.priceType === 'minimum'
      ? 'Precio mínimo'
      : safeForm.priceType === 'premium'
        ? 'Precio premium'
        : safeForm.priceType === 'custom'
          ? 'Precio personalizado'
          : 'Precio recomendado';

  const totalQuote = selectedUnitPrice * quantity;
  const totalBaseCost = baseCost * quantity;
  const quoteDate = new Date();
  const quoteDateLabel = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium' }).format(quoteDate);
  const quoteNumber = `JP-${quoteDate.toISOString().slice(0, 10).replace(/-/g, '')}-${String(Math.round(savedAt)).slice(-4)}`;

  return {
    costPerGram,
    materialCost,
    energyKwh,
    energyCost,
    machineCost,
    baseCost,
    targetProfitPerGram,
    pieceMinProfit,
    minimumPrice,
    recommendedPrice,
    premiumPrice,
    minimumProfit: minimumPrice - baseCost,
    recommendedProfit: recommendedPrice - baseCost,
    premiumProfit: premiumPrice - baseCost,
    selectedUnitPrice,
    selectedPriceLabel,
    quantity,
    totalQuote,
    totalBaseCost,
    totalProfit: totalQuote - totalBaseCost,
    materialMeta: MATERIALS[safeForm.materialType] || MATERIALS.PLA,
    lastSavedLabel: formatDateTime(savedAt),
    quoteDateLabel,
    quoteNumber,
  };
}
