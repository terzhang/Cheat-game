import { useContext } from 'react';
import { Context as gameContext } from '../contexts/game';
import { Context as playerContext } from '../contexts/players';
import { Context as roundContext } from '../contexts/round';

const useStopGame = () => {
  const { stopGame } = useContext(gameContext);
  const { resetPlayers } = useContext(playerContext);
  const { resetRound } = useContext(roundContext);

  // reset a function that resets the game and clear the hands
  return () => {
    // reset game, players, and round state
    stopGame();
    resetPlayers();
    resetRound();
  };
};

export default useStopGame;
