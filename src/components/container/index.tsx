import { FC, HTMLAttributes, PropsWithChildren, ReactElement } from 'react';

import { cn } from '@/utils';

import './style.css';

type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const Container: FC<ContainerProps> = ({
  children,
  className,
  ...rest
}): ReactElement => {
  return (
    <div className={cn('page-container', className)} {...rest}>
      {children}
    </div>
  );
};

export default Container;
