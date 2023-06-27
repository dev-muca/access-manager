export function Dropdown({ label, options, defaultValue, onOptionSelect }) {
  //
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    onOptionSelect(Number(selectedValue));
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <span className="ml-1">{label}</span>
      <select className="border px-2 py-1 rounded" value={defaultValue} onChange={handleSelect}>
        {!!options.length ? (
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))
        ) : (
          <option>Nenhum cargo encontrado</option>
        )}
      </select>
    </div>
  );
}
