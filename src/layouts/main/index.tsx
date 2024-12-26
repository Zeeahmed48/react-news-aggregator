import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

const MainLayout: FC = (): ReactElement => {
  return (
    <div className="page">
      <Header />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
