import React from 'react';
import './App.css';
import Providers from './Providers';
import Auth from './pages/Auth';

function App() {
  return (
    <Providers>
      <Auth />
    </Providers>
  );
}

export default App;
