import { FC, ReactElement } from 'react';

import { cn } from '@/utils';

import './style.css';

const Input: FC<InputProps> = ({
  variant,
  className,
  renderLeftIcon,
  renderRightIcon,
  ...restProps
}): ReactElement => {
  return (
    <div className={cn('input-container', variant, className)}>
      {renderLeftIcon instanceof Function && renderLeftIcon()}
      <input {...restProps} className="text-input" />
      {renderRightIcon instanceof Function && renderRightIcon()}
    </div>
  );
};

export default Input;
