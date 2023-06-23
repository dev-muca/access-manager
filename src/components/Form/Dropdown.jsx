export function Dropdown({ label, options, onOptionSelect }) {
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    onOptionSelect(Number(selectedValue));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <span className="ml-1">{label}</span>
      <select className="border px-2 py-1 rounded" onChange={handleSelect}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
