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
  return cards; // return the popped cards
};

const distributeHandsToAll = (dispatch) => (deck, players) => {
  const distributedCards = [];
  const cardNumPerPlayer = Math.round(deck.length / players.length);
  // generate a new array of players each with a portion of the deck
  const newPlayers = players.map((player) => {
    const newHand = popCardsFromDeck(cardNumPerPlayer, deck);
    distributedCards.push(newHand);
    return { ...player, hand: newHand };
  });
  setPlayers(dispatch)(newPlayers);
  // return a flattened array of the distributed cards
  return distributedCards.flat(Infinity);
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
