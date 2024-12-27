import { FC, PropsWithChildren, ReactElement, Suspense } from 'react';

import { Loader } from '@/components';

const SuspenseWrapper: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

export default SuspenseWrapper;
