import React from 'react';
import './App.css';
import Input from './components/Input';
import useLogin from './hooks/useLogin';

function App() {
  const login = useLogin();

  const handleSubmit = (name) => {
    // add yourself to player state
    const id = 'dummy'; // TODO: generate id
    const player = { id, name, hand: [], isSelf: true };
    login(player); // use the login hook to pass player object to player state and login
  };

  return (
    <div className='App'>
      <Input
        label='Please enter your name'
        aria-label={'name'}
        name='name'
        placeholder='Please enter your name'
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
