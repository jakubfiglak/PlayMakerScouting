import { useContext } from 'react';
import playersContext from './playersContext';
import { State } from '../../types/players';

const usePlayersState = (): State => {
  const context = useContext(playersContext);
  if (context === undefined) {
    throw new Error('usePlayersState hook must be used within PlayersState');
  }

  return context;
};

export default usePlayersState;
