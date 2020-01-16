import React from 'react';
import './App.css';
import Providers from './Providers';
import Auth from './pages/Auth';
import { CSSReset } from '@chakra-ui/core';

function App() {
  return (
    <Providers>
      <CSSReset />
      <Auth />
    </Providers>
  );
}

export default App;
