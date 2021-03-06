import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Flex,
  Button,
  useToast,
  Image,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/core';
import { navigate, useQueryParams } from 'hookrouter';
import Hand from '../components/Hand'; // components
import { Context as gameContext } from '../contexts/game'; // contexts
import { Context as playerContext } from '../contexts/players';
import { Context as roundContext } from '../contexts/round';
// hook
import useNextRound from '../hooks/useNextRound';
import CardSlider from '../components/CardSlider';
// background and table
import texture from '../assets/texture.jpg';
import pokerTable from '../assets/poker-table.png';

const Game = () => {
  const [queryParams, setQueryParams] = useQueryParams();
  const [myHand, setMyHand] = useState(null);
  const [cardToCall, setCardToCall] = useState(null);
  const [online, setOnline] = useState(null);

  const {
    state: { self },
  } = useContext(gameContext);

  const {
    state: { dealer, dealtCard },
    setDealtCard,
  } = useContext(roundContext);

  const { state: players } = useContext(playerContext);

  // method that return your own player object
  const myself = React.useCallback(() => {
    for (let player of players) {
      if (player.id === self) {
        return player;
      }
    }
  }, [players, self]);

  const isDealer = useCallback(() => dealer === self, [dealer, self]);

  const nextRound = useNextRound(); // hook that goes to next round & does necessary state changes

  const toast = useToast();

  const toastConfig = {
    position: 'top',
    status: 'info',
    duration: 2500,
    isClosable: true,
    title: '',
    description: '',
  };

  // pick a dealer and start the new or next round
  useEffect(() => {
    // set state if game is online or offline
    const online = queryParams.isOnline;
    setOnline(online);
    // make a toast
    if (!online) {
      // show toast that you're playing offline.
      toast({
        ...toastConfig,
        title: 'Offline',
        description: 'Enjoy your time with our robot overlords ;)',
      });
    } else {
      // show toast that you're playing online
      toast({
        ...toastConfig,
        status: 'success',
        title: 'Online!',
        description: 'Enjoy your time with these lovely Card Cheaters',
      });
    }
    // call nextRound() to pick a dealer
    if (players.length >= 2) {
      nextRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // side effect for own hand
  useEffect(() => {
    // if name is valid, get own hand
    if (self) {
      const me = myself();
      const hand = me.hand;
      setMyHand(hand);
    }
    // if we are the dealer, show option
  }, [players, self, myself]);

  // side effect for dealt card events
  useEffect(() => {
    // if we're not the dealer, wait for someone to deal a card
    // if state of dealtCard is not null, make a toast.
    if (!online && dealtCard) {
      toast({
        ...toastConfig,
        position: 'bottom-right',
        title: `${dealer.name} called out ${dealtCard}`,
        description: '',
      });
    }
    // back to null on unmount
    return () => setDealtCard(null);
  }, [dealer.name, dealtCard, online, setDealtCard, toast, toastConfig]);

  const handleSliderChange = () => {};

  const cardSelector = () => (
    <>
      <CardSlider currentCardNum={0} />
      <Button borderRadius='md' onClick={() => {}}>
        Call card as {cardToCall}
      </Button>
    </>
  );

  return (
    <Flex
      as='main'
      w='full'
      direction='column'
      justify='center'
      align='center'
      bgImage={`url(${texture})`}
      bgPos='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      title='card table texture'
    >
      <Image
        src={pokerTable}
        bgPos='center'
        bgRepeat='no-repeat'
        position='absolute'
        zIndex={0}
        pointerEvents='none'
        height='inherit'
        width='inherit'
        alt='poker table'
      />
      {myHand && (
        <Hand handArray={myHand} wrapperStyle={{ justifyContent: 'center' }} />
      )}
      {isDealer() && { cardSelector }}
      <Alert status='info'>
        <AlertIcon />
        {isDealer() ? 'You are the dealer' : `${dealer.name} is the dealer`}
      </Alert>
    </Flex>
  );
};

export default Game;
