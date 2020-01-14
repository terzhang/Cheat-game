import { useContext } from 'react';
import { Context as gameContext } from '../contexts/game';
import { Context as playerContext } from '../contexts/players';

const useLogin = () => {
  const { login } = useContext(gameContext);
  const { addPlayer } = useContext(playerContext);

  return (player) => {
    addPlayer(player);
    login(player.id);
  };
};

export default useLogin;
