import React, { lazy } from 'react';
import WithSuspense from '../components/WithSuspense';

const ReadingList = WithSuspense(lazy(() => import('../screens/ReadingList')));
const Search = WithSuspense(lazy(() => import('../screens/Search')));

const routes = [
  {
    path: '/',
    element: <ReadingList />,
  },
  {
    path: '/search',
    element: <Search />,
  },
];

export default routes;
