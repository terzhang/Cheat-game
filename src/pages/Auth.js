import React, { useContext, useEffect } from 'react';
import Input from '../components/Input';
import useLogin from '../hooks/useLogin';
import { Context as gameContext } from '../contexts/game';
import { Context as playerContext } from '../contexts/players';
import useStartOffline from '../hooks/useStartOffline';
import Hand from '../components/Hand';

export default function Auth() {
  const [hand, setHand] = React.useState([]);
  const [displayHand, setDisplayHand] = React.useState(false);
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

  const { state: players } = useContext(playerContext);

  const myself = () => {
    for (let player of players) {
      console.log(player.id, '=', self, '?');
      if (player.id === self) return player;
    }
  };

  const startOffline = useStartOffline();

  const handleStart = () => {
    // generate a hand for each player
    startOffline();
    // display own hand
    setDisplayHand(true);
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

  return (
    <div className='App' style={{ display: 'flex' }}>
      {displayHand ? (
        <Hand
          handArray={myself().hand}
          wrapperStyle={{ justifyContent: 'center' }}
        />
      ) : (
        AuthToStart()
      )}
    </div>
  );
}
