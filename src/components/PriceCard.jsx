import { formatCurrency } from '../utils/format';

export default function PriceCard({ title, subtitle, value, selected, onClick }) {
  return (
    <button type="button" className={`price-option ${selected ? 'selected' : ''}`} onClick={onClick} aria-pressed={selected}>
      <span className="option-radio" aria-hidden="true" />
      <span className="option-copy"><strong>{title}</strong><small>{subtitle}</small></span>
      <strong className="option-amount">{formatCurrency(value)}</strong>
    </button>
  );
}
