import { FC, ReactElement } from 'react';

import './style.css';

const Checkbox: FC<CheckboxProps> = ({
  value,
  label,
  checked,
  ...restProps
}): ReactElement => {
  return (
    <div className="checkbox-container">
      <input
        id={value}
        type="checkbox"
        value={value}
        checked={checked}
        className="checkbox-input"
        {...restProps}
      />
      <label htmlFor={value} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
