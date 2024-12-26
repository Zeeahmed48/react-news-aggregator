import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from '@/layouts';
import { NewsFeed } from '@/views';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'newsfeed',
        element: <NewsFeed />
      }
    ]
  }
]);

export default router;
