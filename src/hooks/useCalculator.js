import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_FORM, EMPTY_FORM, MATERIALS, STORAGE_KEY } from '../constants/materials';
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

  const updateMaterialType = (materialType) => {
    const watts = MATERIALS[materialType]?.watts ?? DEFAULT_FORM.printerPower;
    setForm((current) => ({
      ...current,
      materialType,
      printerPower: watts,
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
    resetForm,
    clearAll,
  };
}
