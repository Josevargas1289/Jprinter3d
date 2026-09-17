export default function SelectInput({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 text-base text-[var(--text)] outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
