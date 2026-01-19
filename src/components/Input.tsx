import slugify from 'slugify';

type InputProps = {
  input: string;
  type?: string;
  label: string;
  name: string;
  value?: string;
  checked?: boolean;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  options?: Array<{ value: string; label: string }> | string[];
}

export function Input({ input, type = "text", label, name, value, checked, required = false, onChange, options }: InputProps) {
  const id = slugify(name, { lower: true });

  switch (input) {
    case "input":
      return (
        <>
          <label htmlFor={id}>{label}{required && <span className='required'>*</span>}</label>
          <input
            type={type}
            id={id}
            name={id}
            value={value ?? ""}
            required={required}
            onChange={onChange} />
        </>
      );
    case "textarea":
      return (
        <>
          <label htmlFor={id}>{label}{required && <span className='required'>*</span>}</label>
          <textarea
            id={id}
            name={id}
            value={value ?? ""}
            required={required}
            onChange={onChange} />
        </>
      )
    case "select":
      return (
        <>
          <label htmlFor={id}>{label}{required && <span className='required'>*</span>}</label>
          <select id={id} name={id} value={value ?? ""} required={required} onChange={onChange}>
            <option value="">Select an option</option>
            {options?.map((option, index) => {
              if (typeof option === 'string') {
                return <option key={index} value={option}>{option}</option>
              } else {
                return <option key={index} value={option.value}>{option.label}</option>
              }
            })}
          </select>
        </>
      )
    case "checkbox":
      return (
        <>
          <label htmlFor={id}>{label}{required && <span className='required'>*</span>}</label>
          <input type="checkbox" id={id} name={id} checked={checked ?? false} required={required} onChange={onChange} />
        </>
      )
    default:
      return null;
  }
}