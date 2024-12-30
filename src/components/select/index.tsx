import { FC, ReactElement } from 'react';

import './style.css';

const Select: FC<SelectProps> = ({
  options,
  label,
  placeholder,
  ...restProps
}): ReactElement => {
  return (
    <form className="select-form">
      {!!label && (
        <label htmlFor="countries" className="select-label">
          {label}
        </label>
      )}
      <select id="countries" className="select-box" {...restProps}>
        {!!placeholder && <option value="">{placeholder}</option>}
        {options.map(({ label, value }) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default Select;
