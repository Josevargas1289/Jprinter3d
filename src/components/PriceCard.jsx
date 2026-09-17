import { formatCurrency } from '../utils/format';

const toneClasses = {
  minimum: 'border-emerald-400/40 bg-emerald-500/10',
  recommended: 'border-cyan-400/40 bg-cyan-500/10',
  premium: 'border-amber-400/40 bg-amber-500/10',
};

export default function PriceCard({ title, value, profit, badge, tone }) {
  return (
    <div className={`rounded-[26px] border p-4 ${toneClasses[tone]}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--muted)]">{title}</p>
          <p className="mt-2 text-2xl font-black sm:text-3xl">{formatCurrency(value)}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Ganancia aprox. por unidad: {formatCurrency(profit)}</p>
        </div>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text)]">
          {badge}
        </span>
      </div>
    </div>
  );
}
