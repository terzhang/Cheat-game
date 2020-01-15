import { useContext /* , useEffect, useRef, useCallback  */ } from 'react';
import { Context as gameContext } from '../contexts/game';
import { Context as playerContext } from '../contexts/players';

const useStartOffline = (npcNum = 4) => {
  const {
    state: { deck },
    startGame,
    setDeck,
  } = useContext(gameContext);

  // player store
  const { state: players, distributeHandsToAll } = useContext(playerContext);

  const generateNpc = () => {
    let npcs = [];
    // generate 3 npcs if 4 players in total so minus 1 from playerNum
    for (let i = 0; i < npcNum; i++) {
      npcs.push({ id: i, name: 'npc' + i, hand: [] });
    }
    return npcs;
  };

  const filterDeck = (cardsToRemove) => {
    // only keep the card if it isn't in the list of cards to remove
    return deck.filter((card) => !cardsToRemove.includes(card));
  };

  return () => {
    // start offline -> generate npcs then give everyone a hand
    // combine npcs to the current player list
    const newPlayersWithNpc = [...players, ...generateNpc()];
    // need to know what cards is distributed from deck
    const distributedCards = distributeHandsToAll(deck, newPlayersWithNpc);
    // make a new deck with those cards removed from the deck
    const filteredDeck = filterDeck(distributedCards);
    // set the filtered deck as new deck
    setDeck(filteredDeck);
    // tell game state it has started
    startGame();
  };
};

export default useStartOffline;
