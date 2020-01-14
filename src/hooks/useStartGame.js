import { useContext } from 'react';
import { Context as gameContext } from '../contexts/game';
import { Context as playerContext } from '../contexts/players';

const useStartGame = () => {
  const { state: game, startGame, setDeck } = useContext(gameContext);
  const { state: players, addPlayers, setPlayers } = useContext(playerContext);

  // generate npc characters
  const generateNpc = () => {
    let newPlayers = [];
    for (let i = 0; i < game.playerNum; i++) {
      newPlayers.push({ id: i, name: 'npc' + i, hand: [] });
    }
    return newPlayers;
  };

  const pickIndexFromArray = (array) =>
    Math.floor(Math.random() * array.length);

  // take out a numbers of card from given deck and return it
  const popCardsFromDeck = (cardNum, deck) => {
    let cards = [];
    // pop {cardNum} amount of cards out
    for (let i = 0; i < cardNum; i++) {
      // pick an card at random from deck
      const cardIndex = pickIndexFromArray(deck);
      const card = deck[cardIndex];
      // add the picked card to the cards array
      cards.push(card);
      //// remove that card from deck by its index
      //// deck = deck.splice(cardIndex, 1);
    }
    // filter the picked cards from deck
    let newDeck = deck.filter((card) => !cards.includes(card));
    setDeck(newDeck); // set the filtered deck in state
    return cards; // return the popped cards
  };

  // generate a hand for each player
  const distribute = () => {
    const cardNumPerPlayer = game.totalCards / game.PlayerNum;
    // generate a new array of players each with a portion of the deck
    const newPlayers = players.map((player) => {
      const newHand = popCardsFromDeck(cardNumPerPlayer, game.deck);
      return { ...player, hand: newHand };
    });
    setPlayers(newPlayers);
  };

  return () => {
    const npcs = generateNpc();
    // add the generated npc into the players state
    addPlayers(npcs);
    // assign hands to everyone
    distribute();
    // tell game state it has started
    startGame();
  };
};

export default useStartGame;
