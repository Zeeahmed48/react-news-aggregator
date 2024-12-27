import { FC, ReactElement } from 'react';

import { cn } from '@/utils';

import './style.css';

const Card: FC<CardProps> = ({
  variant,
  children,
  className,
  ...restProps
}): ReactElement => {
  return (
    <div className={cn('card', variant, className)} {...restProps}>
      {children}
    </div>
  );
};

export default Card;
