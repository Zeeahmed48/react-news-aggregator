import { FC, ReactElement } from 'react';

import './style.css';

const DatePicker: FC<DatePickerProps> = ({
  label,
  ...restProps
}): ReactElement => {
  return (
    <div className="date-picker-container">
      {!!label && (
        <label htmlFor="date" className="date-picker-label">
          {label}
        </label>
      )}
      <input
        type="date"
        id="date"
        className="date-picker-input"
        {...restProps}
      />
    </div>
  );
};

export default DatePicker;
