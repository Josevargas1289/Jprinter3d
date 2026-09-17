export default function TextAreaInput({ id, value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      id={id}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="form-control resize-y"
    />
  );
}
