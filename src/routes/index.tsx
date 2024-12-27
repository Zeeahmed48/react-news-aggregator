import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { SuspenseWrapper } from '@/components';

const MainLayout = lazy(() => import('@/layouts/main'));
const NewsFeed = lazy(() => import('@/views/news-feed'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <MainLayout />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: 'newsfeed',
        element: (
          <SuspenseWrapper>
            <NewsFeed />
          </SuspenseWrapper>
        )
      }
    ]
  }
]);

export default router;
