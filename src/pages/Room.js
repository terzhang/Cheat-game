import React from 'react';
import { navigate } from 'hookrouter';
import useStartOffline from '../hooks/useStartOffline';
import { Flex, Button } from '@chakra-ui/core';

const Room = () => {
  const startOffline = useStartOffline();

  const handleStart = () => {
    // generate a hand for each player
    startOffline();
    navigate('/game');
    // decide who is the starting dealer
    // decide a starting card
    // display round actions
  };

  return (
    <Flex as='main' justify='center' align='center'>
      <Button onClick={handleStart}>Start Game!</Button>
    </Flex>
  );
};

export default Room;
