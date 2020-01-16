import React from 'react';
import { Provider as PlayerProvider } from './contexts/players';
import { Provider as RoundProvider } from './contexts/round';
import { Provider as GameProvider } from './contexts/game';
import { ThemeProvider } from '@chakra-ui/core';
import theme from './theme';

// HOF provider provider
const Providers = ({ children }) => (
  <GameProvider>
    <RoundProvider>
      <PlayerProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </PlayerProvider>
    </RoundProvider>
  </GameProvider>
);

export default Providers;
