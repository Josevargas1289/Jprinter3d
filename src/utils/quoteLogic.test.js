import { describe, expect, it } from 'vitest';
import { calculateQuote } from './quoteLogic';

describe('calculateQuote', () => {
  it('calcula un precio recomendado y total cotizado correctamente', () => {
    const form = {
      materialType: 'PLA',
      quantity: 2,
      rollPrice: 80000,
      rollWeight: 1000,
      usedGrams: 200,
      printHours: 2,
      printerPower: 95,
      kwhPrice: 780,
      machineHour: 1000,
      extras: 15000,
      targetProfit: 350000,
      roundTo: 500,
      priceType: 'recommended',
      customPrice: 0,
    };

    const result = calculateQuote({ form, savedAt: 1700000000000 });

    expect(result.quantity).toBe(2);
    expect(result.selectedPriceLabel).toBe('Precio recomendado');
    expect(result.totalQuote).toBeGreaterThan(0);
    expect(result.totalProfit).toBeGreaterThan(0);
    expect(result.quoteNumber).toMatch(/^JP-\d{8}-\d{4}$/);
  });
});
