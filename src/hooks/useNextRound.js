import { useContext } from 'react';
import { Context as playerContext } from '../contexts/players';
import { Context as roundContext } from '../contexts/round';
import { Context as gameContext } from '../contexts/game';

const pickIndexFromArray = (array) => Math.floor(Math.random() * array.length);

const useNextRound = () => {
  const { state: players } = useContext(playerContext);
  const { state: addDealtCards } = useContext(gameContext);
  const { state: round, nextRoundWithNewDealer } = useContext(roundContext);

  function endGame(dealer) {
    console.log(dealer + ' is the winner');
  }

  function judgment(player) {
    console.log(player + 'invoked judgment');
  }

  // the dealer index is the index of the player in the players state
  function getDealerIndex() {
    for (const [index, player] of players.entries()) {
      // return the dealer index
      if (round.dealerId === player.id) return index;
    }
  }

  const nextDealer = () => {
    let playerIndex;
    if (!round.dealer) {
      // no dealer -> set a random player as dealer
      playerIndex = pickIndexFromArray(players);
    } else {
      // otherwise set the next player in the index as dealer
      playerIndex = getDealerIndex() + 1;
    }
    // get the playerId of the player next to be the dealer
    const playerId = players[playerIndex];
    return playerId;
  };

  const nextRound = () => {
    // check if dealer won
    if (round.victor) {
      endGame(round.dealer);
    }
    // push current dealt card to the dealt cards array (if there is any)
    // there won't be any if it's a new game
    if (round.dealtCard) addDealtCards(round.dealtCard);
    nextRoundWithNewDealer(nextDealer());
  };

  return nextRound;
};

export default useNextRound;
