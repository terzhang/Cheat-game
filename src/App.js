import React from 'react';
import './App.css';
import Providers from './Providers';
import Auth from './pages/Auth';
import Room from './pages/Room';
import { CSSReset } from '@chakra-ui/core';
import { useRoutes } from 'hookrouter';

const routes = {
  '/': () => <Auth />,
  '/room': () => <Room />,
};

const Router = () => useRoutes(routes);

function App() {
  // const router = useRoutes(routes);
  return (
    <Providers>
      <CSSReset />
      <Router />
    </Providers>
  );
}

export default App;
