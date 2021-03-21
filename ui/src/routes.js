import React from 'react';
import MainLayout from './layouts/MainLayout';
import NotFound from './views/NotFound';
import Tokens from './views/Tokens';
import TokensMap from './views/TokensMap';
import Home from './views/Home';
import Mint from './views/Mint';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home />},
      { path: 'tokens', element: <Tokens />},
      { path: 'tokens-map', element: <TokensMap />},
      { path: 'mint', element: <Mint />},
      { path: "*", element: <NotFound /> }
    ]
  }
]

export default routes;