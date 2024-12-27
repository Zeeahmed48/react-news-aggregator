import { ComponentType, FC, ReactElement } from 'react';

import { Loader } from '@/components';

type WithLoaderProps = {
  isLoading: boolean;
};

const withLoader = <T extends object>(Component: ComponentType<T>) => {
  const EnhanceComponent: FC<T & WithLoaderProps> = ({
    isLoading,
    ...rest
  }): ReactElement => {
    if (isLoading) {
      return <Loader />;
    }

    return <Component {...(rest as T)} />;
  };

  EnhanceComponent.displayName = `withLoader(${Component.displayName ?? Component.name})`;

  return EnhanceComponent;
};

export default withLoader;
