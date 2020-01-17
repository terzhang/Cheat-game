import React, { useState, useContext, useEffect } from 'react';
import { Flex } from '@chakra-ui/core';
import { navigate } from 'hookrouter';
import Hand from '../components/Hand'; // components
import { Context as gameContext } from '../contexts/game'; // contexts
import { Context as playerContext } from '../contexts/players';

import CardSlider from '../components/CardSlider';

const Game = () => {
  const [myHand, setMyHand] = useState(null);
  const {
    state: { self },
  } = useContext(gameContext);

  const { state: players } = useContext(playerContext);

  const myself = React.useCallback(() => {
    for (let player of players) {
      if (player.id === self) {
        return player;
      }
    }
  }, [players, self]);

  useEffect(() => {
    if (self) {
      const me = myself();
      const hand = me.hand;
      setMyHand(hand);
    } else {
      console.log('wrong route');
      navigate('/');
    }
  }, [players, self, myself]);

  return (
    <Flex as='main' w='full' direction='column' justify='center' align='center'>
      {myHand && (
        <Hand handArray={myHand} wrapperStyle={{ justifyContent: 'center' }} />
      )}
      <CardSlider currentCardNum={0} />
    </Flex>
  );
};

export default Game;
