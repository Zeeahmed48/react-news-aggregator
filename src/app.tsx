import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './routes';

const App: FC = (): ReactElement => {
  return <RouterProvider router={router} />;
};

export default App;
