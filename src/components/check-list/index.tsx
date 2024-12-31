import { ChangeEvent, FC, ReactElement, useCallback } from 'react';

import { Checkbox } from '@/components';

import './style.css';

const CheckList: FC<CheckListProps> = ({
  title,
  list,
  selectedItems,
  onSelectionChange
}): ReactElement => {
  const isItemChecked = useCallback(
    (item: string) => selectedItems.includes(item),
    [selectedItems]
  );

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, value: string) => {
      const { checked } = e.target;

      const updatedSelection = checked
        ? [...selectedItems, value]
        : selectedItems.filter((item) => item !== value);

      onSelectionChange(updatedSelection);
    },
    [selectedItems, onSelectionChange]
  );

  return (
    <>
      {!!title && <h4 className="checklist-title">{title}</h4>}
      <div className="checklist-container">
        {list.map(({ value, label }) => (
          <Checkbox
            key={value}
            value={value}
            label={label}
            checked={isItemChecked(value)}
            onChange={(e) => handleCheckboxChange(e, value)}
          />
        ))}
      </div>
    </>
  );
};

export default CheckList;
