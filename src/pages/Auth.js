import React, { useContext } from 'react';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import { Context as gameContext } from '../contexts/game';
import useStartGame from '../hooks/useStartGame';

export default function Auth() {
  const login = useLogin();

  const handleSubmit = (name) => {
    // add yourself to player state
    const id = 'dummy'; // TODO: generate id
    const player = { id, name, hand: [], isSelf: true };
    login(player); // use the login hook to pass player object to player state and login
  };

  const {
    state: { self },
  } = useContext(gameContext);

  const startGame = useStartGame();

  const handleStart = () => {
    // generate a hand for each player
    startGame();
    // display own hand

    // decide who is the starting dealer
    // decide a starting card
    // display round actions
  };

  const AuthToStart = () => {
    return self ? (
      <button type='button' onClick={handleStart}>
        Start Game!
      </button>
    ) : (
      <Input
        label='Please enter your name'
        aria-label={'name'}
        name='name'
        placeholder='Please enter your name'
        onSubmit={handleSubmit}
      />
    );
  };

  return <div className='App'>{AuthToStart()}</div>;
}
