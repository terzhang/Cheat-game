import createDataContext from '../utils/createDataContext';

const round = {
  dealer: { id: null, name: '' },
  index: null,
  challenger: { id: null, name: null },
  victor: { id: null, name: null },
  dealtCard: null,
};

const roundReducer = (state, action) => {
  switch (action.type) {
    case 'setDealer':
      return { ...state, dealer: action.payload };
    case 'setChallenger':
      return { ...state, challenger: action.payload };
    case 'setVictor':
      return { ...state, victor: action.payload };
    case 'setDealtCard':
      return { ...state, dealtCard: action.payload };
    case 'nextRoundWithNewDealer':
      return {
        ...state,
        dealer: { id: null, name: '' },
        index: state.index + 1,
        dealtCard: null,
        challenger: { id: null, name: '' },
      };
    case 'resetRound':
      return round;
    default:
      return state;
  }
};

const setDealer = (dispatch) => (dealer) => {
  dispatch({ type: 'setDealer', payload: dealer });
};
const setChallenger = (dispatch) => (challenger) => {
  dispatch({ type: 'setChallenger', payload: challenger });
};
const setVictor = (dispatch) => (victor) => {
  dispatch({ type: 'setVictor', payload: victor });
};
const setDealtCard = (dispatch) => (card) => {
  dispatch({ type: 'setDealtCard', payload: card });
};
const nextRoundWithNewDealer = (dispatch) => (dealer) => {
  dispatch({ type: 'nextRoundWithNewDealer', payload: dealer });
};
const resetRound = (dispatch) => () => {
  dispatch({ type: 'resetRound' });
};
/* function resetDealtCard() {
  dealtCard = {card:'', faceDown: true}
} */

const roundActions = {
  setDealer,
  setChallenger,
  setVictor,
  setDealtCard,
  nextRoundWithNewDealer,
  resetRound,
};

export const { Context, Provider } = createDataContext({
  reducer: roundReducer,
  actions: roundActions,
  initialState: round,
  displayName: 'roundContext',
});
