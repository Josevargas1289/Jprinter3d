export default function TextInput({ id, value, onChange, placeholder }) {
  return (
    <input
      id={id}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="form-control"
    />
  );
}
