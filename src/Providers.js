import React from 'react';
import { Provider as PlayerProvider } from './contexts/players';
import { Provider as RoundProvider } from './contexts/round';
import { Provider as GameProvider } from './contexts/game';

// HOF provider provider
const Providers = ({ children }) => (
  <GameProvider>
    <RoundProvider>
      <PlayerProvider>{children}</PlayerProvider>
    </RoundProvider>
  </GameProvider>
);

export default Providers;
