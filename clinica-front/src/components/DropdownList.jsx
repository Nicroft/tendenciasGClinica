export function DropdownList({ label, name, options, value, onChange }) {
    return (
      <div>
        <label>{label}</label>
        <select name={name} value={value} onChange={onChange} required>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.full_name} 
            </option>
          ))}
        </select>
      </div>
    );
  }
  