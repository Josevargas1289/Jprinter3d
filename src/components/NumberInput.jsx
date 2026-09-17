export default function NumberInput({ id, value, onChange, step = 'any', min = 0, placeholder }) {
  return (
    <input
      id={id}
      type="number"
      inputMode="decimal"
      min={min}
      step={step}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 text-base text-[var(--text)] outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15"
    />
  );
}
