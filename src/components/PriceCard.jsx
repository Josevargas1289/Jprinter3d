import { formatCurrency } from '../utils/format';

const toneClasses = {
  minimum: 'border-[var(--success-border)] bg-[var(--success-soft)]',
  recommended: 'border-[var(--accent-border)] bg-[var(--accent-soft)]',
  premium: 'border-[var(--warning-border)] bg-[var(--warning-soft)]',
};

export default function PriceCard({ title, value, profit, badge, tone }) {
  return (
    <div className={`rounded-lg border p-3 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[var(--text)]">{title}</p>
          <p className="mt-1 text-xl font-black">{formatCurrency(value)}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">Utilidad/u {formatCurrency(profit)}</p>
        </div>
        <span className="rounded-md border border-[var(--border)] bg-[var(--panel)] px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
          {badge}
        </span>
      </div>
    </div>
  );
}
