export default function TextAreaInput({ id, value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--soft)] px-4 py-3 text-base text-[var(--text)] outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15"
    />
  );
}
