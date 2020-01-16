import React, { useContext, useEffect } from 'react';
import { Context as gameContext } from '../contexts/game'; // contexts
import { Context as playerContext } from '../contexts/players';
import useLogin from '../hooks/useLogin'; // hooks
import useStartOffline from '../hooks/useStartOffline';
import Hand from '../components/Hand'; // components
import { Flex, Button } from '@chakra-ui/core';
import CardSlider from '../components/CardSlider';
import AuthInput from '../components/AuthInput';
import { navigate } from 'hookrouter';

export default function Auth() {
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
    navigate('/room');
    // display own hand
    setDisplayHand(true);
    // decide who is the starting dealer
    // decide a starting card
    // display round actions
  };

  const AuthToStart = () => {
    return self ? (
      <Button onClick={handleStart}>Start Game!</Button>
    ) : (
      <AuthInput label='Please enter your name' onSubmit={handleSubmit} />
    );
    // null;
  };

  return (
    <Flex as='main' justify='center' direction='column' size='auto'>
      <Flex direction='row' justify='center' size='auto' w='100%'>
        {displayHand ? (
          <Hand
            handArray={myself().hand}
            wrapperStyle={{ justifyContent: 'center' }}
          />
        ) : (
          AuthToStart()
        )}
      </Flex>
      <CardSlider currentCardNum={0} />
    </Flex>
  );
}
