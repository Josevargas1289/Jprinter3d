export default function BreakdownRow({ label, value, strong = false }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] py-3 last:border-b-0">
      <span className={`text-sm ${strong ? 'font-bold text-[var(--text)]' : 'text-[var(--muted)]'}`}>{label}</span>
      <span className={`text-sm ${strong ? 'font-black text-[var(--text)]' : 'font-semibold text-[var(--text)]'}`}>{value}</span>
    </div>
  );
}
