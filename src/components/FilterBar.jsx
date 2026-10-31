// options: [{ value, label }]
export default function FilterBar({ options, value, onChange, label }) {
  return (
    <div className="filterbar" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" className="chip" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
