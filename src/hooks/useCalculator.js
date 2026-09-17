import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_FORM, EMPTY_FORM, MARKET_ASSUMPTIONS, MATERIALS, QUICK_PRESETS, STORAGE_KEY } from '../constants/materials';
import { calculateQuote } from '../utils/quoteLogic';
import { useLocalStorage } from './useLocalStorage';

export function useCalculator() {
  const [form, setForm, clearStored] = useLocalStorage(STORAGE_KEY, DEFAULT_FORM);
  const [savedAt, setSavedAt] = useState(Date.now());

  useEffect(() => {
    setSavedAt(Date.now());
  }, [form]);

  const updateField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const applyMarketRates = (materialType = form.materialType) => {
    const material = MATERIALS[materialType] || MATERIALS.PLA;
    setForm((current) => ({
      ...current,
      materialType,
      rollPrice: material.marketRollPrice,
      rollWeight: 1000,
      printerPower: material.watts,
      wastePercent: material.wastePercent,
      failureRate: material.failureRate,
      kwhPrice: current.kwhPrice || MARKET_ASSUMPTIONS.kwhPrice,
      machineHour: current.machineHour || MARKET_ASSUMPTIONS.machineHour,
      laborRate: current.laborRate || MARKET_ASSUMPTIONS.laborRate,
      targetMargin: current.targetMargin || MARKET_ASSUMPTIONS.targetMargin,
    }));
  };

  const updateMaterialType = (materialType) => {
    const material = MATERIALS[materialType] || MATERIALS.PLA;
    setForm((current) => ({
      ...current,
      materialType,
      printerPower: material.watts,
      rollPrice: material.marketRollPrice,
      wastePercent: material.wastePercent,
      failureRate: material.failureRate,
    }));
  };

  const applyPreset = (presetKey) => {
    const preset = QUICK_PRESETS[presetKey];
    if (!preset) return;

    setForm((current) => ({
      ...current,
      ...preset.values,
    }));
  };

  const resetForm = () => {
    setForm({ ...DEFAULT_FORM });
  };

  const clearAll = () => {
    const emptyForm = { ...EMPTY_FORM };
    setForm(emptyForm);
    clearStored();
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyForm));
    }
  };

  const results = useMemo(() => calculateQuote({ form, savedAt }), [form, savedAt]);

  return {
    form,
    results,
    updateField,
    updateMaterialType,
    applyPreset,
    applyMarketRates,
    resetForm,
    clearAll,
  };
}
