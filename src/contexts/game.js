import createDataContext from '../utils/createDataContext';
import shuffle from '../utils/shuffle';
import { TOTAL_CARDS, PLAYER_NUM } from '../constants/cards';
import DECK from '../constants/deck';

const game = {
  dealtCards: [],
  started: false,
  self: null,
  /* totalCards: TOTAL_CARDS, */
  /* playerNum: PLAYER_NUM, */
  deck: DECK,
};

const gameReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'login':
      return { ...state, self: payload };
    case 'startGame':
      return { ...state, started: true };
    case 'stopGame':
      return {
        ...state,
        started: false,
        self: null,
        dealtCard: [],
        /* totalCards: TOTAL_CARDS, */
        /* playerNum: PLAYER_NUM, */
        deck: DECK,
      };
    case 'addDealtCards':
      return { ...state, dealtCards: [...state.dealtCards, payload] };
    case 'clearDealtCards':
      return { ...state, dealtCards: [] };
    case 'shuffleDealtCards':
      return { ...state, dealtCards: payload };
    /*     case 'setTotalCards':
      return { ...state, totalCards: payload }; */
    /*     case 'setPlayerNum':
      return { ...state, playerNum: payload }; */
    case 'setDeck':
      return { ...state, deck: payload };
    default:
      return state;
  }
};

/* const setTotalCards = (dispatch) => (totalCards) => {
  dispatch({ type: 'setTotalCards', payload: totalCards });
};

const setPlayerNum = (dispatch) => (playerNum) => {
  // TODO: clamp num between 2 - 5
  dispatch({ type: 'setPlayerNum', payload: playerNum });
}; */

const setDeck = (dispatch) => (deck) => {
  dispatch({ type: 'setDeck', payload: deck });
};

// set id for self prop in state
const login = (dispatch) => (selfId) => {
  dispatch({ type: 'login', payload: selfId });
};

// change the game state to started: true
const startGame = (dispatch) => () => {
  dispatch({ type: 'startGame' });
};

// change game state to started: false and reset everything
const stopGame = (dispatch) => () => {
  dispatch({ type: 'stopGame' });
};

// card === 'A_heart' etc
const addDealtCards = (dispatch) => (card) => {
  dispatch({ type: 'addDealtCards', payload: card });
};

const clearDealtCards = (dispatch) => () => {
  dispatch({ type: 'clearDealtCards' });
};

const shuffleDealtCards = (dispatch) => (state) => {
  const shuffledCards = shuffle(state.dealtCards);
  dispatch({ type: 'clearDealtCards', payload: shuffledCards });
};

const gameActions = {
  login,
  startGame,
  stopGame,
  addDealtCards,
  clearDealtCards,
  shuffleDealtCards,
  /* setTotalCards,
  setPlayerNum, */
  setDeck,
};

export const { Context, Provider } = createDataContext({
  reducer: gameReducer,
  actions: gameActions,
  initialState: game,
  displayName: 'gameContext',
});
