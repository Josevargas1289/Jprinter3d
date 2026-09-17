export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function parseNumber(value, fallback = 0) {
  const normalized = typeof value === 'string' ? value.replace(/,/g, '.') : value;
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function ceilTo(value, step) {
  if (!step || step <= 0) return value;
  return Math.ceil(value / step) * step;
}

export function formatDateTime(timestamp) {
  if (!timestamp) return '—';

  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}
