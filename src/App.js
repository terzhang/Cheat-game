import React, { Suspense, lazy } from 'react';
import Providers from './Providers';

import { CSSReset, Spinner } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import global from './theme/global';
import { useRoutes, useRedirect } from 'hookrouter';
const Auth = lazy(() => import('./pages/Auth'));
const Room = lazy(() => import('./pages/Room'));
const Game = lazy(() => import('./pages/Game'));

const routes = {
  '/game': () => <Game />,
  '/': () => <Auth />,
  '/room': () => <Room />,
};

const Router = () => useRoutes(routes);

function App() {
  useRedirect('/room', '/');
  return (
    <Providers>
      <CSSReset />
      <Global styles={global} />
      <Suspense fallback={<Spinner color='gray' />}>
        <Router />
      </Suspense>
    </Providers>
  );
}

export default App;
