import React from 'react';
import useLogin from '../hooks/useLogin'; // hooks

import { Flex } from '@chakra-ui/core';
import AuthInput from '../components/AuthInput';
import { navigate } from 'hookrouter';

export default function Auth() {
  const login = useLogin();

  const handleSubmit = (name) => {
    // add yourself to player state
    const id = 'dummy'; // TODO: generate id
    const player = { id, name, hand: [], isSelf: true };
    login(player); // use the login hook to pass player object to player state and login
    navigate('/room');
  };

  return (
    <Flex
      as='main'
      justify='center'
      align='center'
      direction='column'
      size='auto'
    >
      <AuthInput label='Please enter your name' onSubmit={handleSubmit} />
    </Flex>
  );
}
