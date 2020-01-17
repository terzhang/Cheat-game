import React from 'react';
import Providers from './Providers';
import Auth from './pages/Auth';
import Room from './pages/Room';
import Game from './pages/Game';
import { CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import global from './theme/global';
import { useRoutes, useRedirect } from 'hookrouter';

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
      <Router />
    </Providers>
  );
}

export default App;
