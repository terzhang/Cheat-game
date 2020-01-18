import React, { useState } from 'react';
import { navigate } from 'hookrouter';
import useStartOffline from '../hooks/useStartOffline';
import { Flex, Button, ButtonGroup, CircularProgress } from '@chakra-ui/core';

const Room = () => {
  const [loading, setLoading] = useState(false);
  const startOffline = useStartOffline();

  const handleOfflineStart = () => {
    setLoading(true);
    // generate a hand for each player
    startOffline();
    setLoading(false);
    // pass the isOnline param to next page
    navigate('/game', false, { isOnline: false });
  };

  const handleOnlineStart = () => {
    setLoading(true);
    //startOnline(id)
    setLoading(false);
    navigate('/game', false, { isOnline: true });
  };

  return (
    <Flex as='main' justify='center' align='center'>
      {loading && <CircularProgress isIndeterminate />}
      <ButtonGroup spacing={4}>
        <Button onClick={handleOfflineStart} isLoading={loading}>
          Start Offline
        </Button>
        <Button isDisabled onClick={handleOnlineStart} isLoading={loading}>
          Play Online (not yet available)
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Room;
