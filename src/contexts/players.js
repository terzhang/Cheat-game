import createDataContext from '../utils/createDataContext';

// initial state
const players = [
  /* { id: '1', name: 'A', hand: [] },
  { id: '2', name: 'B', hand: [] },
  { id: '3', name: 'C', hand: [] }, */
];

// reducer sets the state with defined actions
const playerReducer = (state, action) => {
  switch (action.type) {
    case 'addPlayer':
      return [...state, action.payload];
    case 'addPlayers':
      return [...state, ...action.payload];
    case 'replacePlayer':
      return action.payload;
    case 'removePlayer':
      return state.filter((player) => player.id !== action.payload);
    case 'setPlayerProperty':
      return action.payload;
    case 'setPlayers':
      return action.payload;
    default:
      return state;
  }
};

const pickIndexFromArray = (array) => Math.floor(Math.random() * array.length);

function arraySwapAndPop(index, array) {
  array[index] = array[array.length - 1];
  array.pop();
}

// take out a numbers of card from given deck and return it
const popCardsFromDeck = (cardNum, deck) => {
  let tempCards = [...deck]; // to be mutated
  let cards = [];
  // pop {cardNum} amount of cards out
  for (let i = 0; i < cardNum; i++) {
    // pick a card at random from temp deck
    const pickedIndex = pickIndexFromArray(tempCards);
    const pickedCard = tempCards[pickedIndex];

    // add the picked card to the cards array
    cards.push(pickedCard);
    // but delete it from the temp deck
    arraySwapAndPop(pickedIndex, tempCards);
  }
  return cards; // return the popped cards
};

const arrayRemoveManyByItem = (itemArray, array) => {
  return array.filter((item) => !itemArray.includes(item));
};

const distributeHandsToAll = (dispatch) => (deck, players) => {
  let tempDeck = [...deck];
  const distributedCards = [];
  const cardNumPerPlayer = Math.round(deck.length / players.length);
  // generate a new array of players each with a portion of the deck
  const newPlayers = players.map((player) => {
    // randomly take cards from the deck and return each players with it
    const newHand = popCardsFromDeck(cardNumPerPlayer, tempDeck);
    // ? solution: remove cards from deck after popping hand
    tempDeck = arrayRemoveManyByItem(newHand, tempDeck);
    distributedCards.push(...newHand);
    return { ...player, hand: newHand };
  });

  setPlayers(dispatch)(newPlayers);
  // return a flattened array of the distributed cards
  const flatDistributedCards = distributedCards.flat(Infinity);
  return flatDistributedCards;
};

// replace the whole state
const setPlayers = (dispatch) => (newPlayers) => {
  dispatch({
    type: 'setPlayers',
    payload: newPlayers,
  });
};

// reset the players state to initial state
const resetPlayers = () => {
  setPlayers(players);
};

// add more player to the state array
const addPlayer = (dispatch) => (player) => {
  dispatch({ type: 'addPlayer', payload: player });
};
// add many players to the state array
const addPlayers = (dispatch) => (players) => {
  dispatch({ type: 'addPlayers', payload: players });
};

// remove a player from the state array
const removePlayer = (dispatch) => (id) => {
  dispatch({ type: 'removePlayer', payload: id });
};

// replace a player fromt the state array
const replacePlayer = (dispatch) => (player, state) => {
  // new player object with the given player replaced
  const newPlayers = state.map((thisPlayer) => {
    if (player.id === thisPlayer.id) {
      return player;
    }
    return thisPlayer;
  });
  dispatch({ type: 'replacePlayer', payload: newPlayers });
};

// change the hand of the player with given id
const setPlayerProperty = (dispatch) => (id, prop, state) => {
  const propName = Object.keys(prop)[0];
  const newPlayers = state.map((thisPlayer) => {
    // check if property is in object
    if (propName in thisPlayer)
      throw Error('tried to set non-existent property');
    // override the property with given property when id match
    if (id === thisPlayer.id) {
      return { ...thisPlayer, ...prop };
    }
    return thisPlayer;
  });
  dispatch({ type: 'setPlayerProperty', payload: newPlayers });
};

const setHand = (id, hand) => setPlayerProperty(id, { hand });
const setName = (id, name) => setPlayerProperty(id, { name });

const playerActions = {
  addPlayer,
  addPlayers,
  removePlayer,
  replacePlayer,
  setHand,
  setName,
  setPlayers,
  resetPlayers,
  distributeHandsToAll,
  /* startOffline, */
};

export const { Context, Provider } = createDataContext({
  reducer: playerReducer,
  actions: playerActions,
  initialState: players,
  displayName: 'playerContext',
});
