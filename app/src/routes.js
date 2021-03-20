import React from 'react';
import MainLayout from './layouts/MainLayout';
import NotFound from './views/NotFound';
import Home from './views/Home';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Home />},
      { path: "*", element: <NotFound /> }
    ]
  }
]

export default routes;