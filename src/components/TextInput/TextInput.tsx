import { useId, type HTMLInputTypeAttribute } from 'react';
import type { Icon } from 'tabler-icons-react';
import './text-input.css';

export interface TextInputProps {
  name?: string | undefined;
  label?: string | undefined;
  description?: string | undefined;
  error?: string | undefined;
  placeholder?: string | undefined;
  withAsterisk?: boolean | undefined;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean | undefined;
  icon?: Icon | undefined;
  radius?: string | undefined;
  value?: string | undefined;
  className?: string | undefined;
  required?: boolean | undefined;
}

function TextInput({
  name,
  label,
  description,
  error,
  placeholder,
  withAsterisk = false,
  type = 'text',
  disabled = false,
  icon,
  radius,
  value,
  className,
  required = false
}: TextInputProps) {
  const id = useId();
  const IconComponent = icon;
  const hasIcon = !!icon;
  const style = { borderRadius: radius } as React.CSSProperties;

  if (type === 'radio' || type === 'checkbox') {
    style.borderStyle = 'none';
  }
  
  return (
    <div className={`text-input ${className ?  className : ''}`}>
      <label htmlFor={id} className="text-input__label">
        {label}
        {withAsterisk && <span style={{ color: 'red' }}>*</span>}
      </label>
      {description && <p className="text-input__description">{description}</p>}
      <div className="text-input__wrapper" style={style}>
        {IconComponent && <IconComponent />}
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          required={required || withAsterisk}
          className={`text-input__input ${hasIcon ? 'text-input__input--with-icon' : ''}`}
          value={value}
        />
      </div>
      {error && <p className="text-input__error">{error}</p>}
    </div>
  );
}

export default TextInput;
