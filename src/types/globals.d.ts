import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from 'react';

declare global {
  type ContainerProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

  type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'primary-light-contained' | 'white-bordered';
    renderLeftIcon?: () => ReactElement | null;
    renderRightIcon?: () => ReactElement | null;
  };
}
