export const MATERIALS = {
  PLA: {
    value: 'PLA',
    label: 'PLA',
    watts: 95,
    note: 'Referencia ideal para piezas comunes en la Bambu Lab A1.',
  },
  PETG: {
    value: 'PETG',
    label: 'PETG',
    watts: 110,
    note: 'Normalmente consume un poco más por cama y boquilla más exigentes.',
  },
  TPU: {
    value: 'TPU',
    label: 'TPU',
    watts: 105,
    note: 'Buen punto de partida para material flexible.',
  },
};

export const MATERIAL_OPTIONS = Object.values(MATERIALS).map((material) => ({
  label: `${material.label} · ${material.watts} W`,
  value: material.value,
}));

export const ROUND_OPTIONS = [
  { label: '$100', value: 100 },
  { label: '$500', value: 500 },
  { label: '$1.000', value: 1000 },
];

export const PRICE_TYPE_OPTIONS = [
  { label: 'Precio mínimo', value: 'minimum' },
  { label: 'Precio recomendado', value: 'recommended' },
  { label: 'Precio premium', value: 'premium' },
  { label: 'Precio personalizado', value: 'custom' },
];

export const DEFAULT_FORM = {
  businessName: 'JPrinter3D',
  businessSubtitle: 'Impresión 3D personalizada',
  contactInfo: '',
  documentType: 'quote',
  quoteName: '',
  clientName: '',
  quantity: 1,
  materialType: 'PLA',
  rollPrice: 80000,
  rollWeight: 1000,
  usedGrams: 0,
  printHours: 0,
  printerPower: 95,
  kwhPrice: 780,
  machineHour: 1000,
  extras: 0,
  targetProfit: 350000,
  roundTo: 500,
  priceType: 'recommended',
  customPrice: 0,
  deliveryDays: 0,
  validityDays: 3,
  deliveryMethod: '',
  paymentTerms: '',
  notes: '',
};

export const EMPTY_FORM = {
  businessName: 'JPrinter3D',
  businessSubtitle: 'Impresión 3D personalizada',
  contactInfo: '',
  documentType: 'quote',
  quoteName: '',
  clientName: '',
  quantity: 1,
  materialType: 'PLA',
  rollPrice: 0,
  rollWeight: 0,
  usedGrams: 0,
  printHours: 0,
  printerPower: 95,
  kwhPrice: 0,
  machineHour: 0,
  extras: 0,
  targetProfit: 0,
  roundTo: 500,
  priceType: 'recommended',
  customPrice: 0,
  deliveryDays: 0,
  validityDays: 0,
  deliveryMethod: '',
  paymentTerms: '',
  notes: '',
};

export const STORAGE_KEY = 'jprinter3d:calculator:v5';
export const THEME_STORAGE_KEY = 'jprinter3d:theme';
