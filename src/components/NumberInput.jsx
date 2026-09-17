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
      className="form-control"
    />
  );
}
