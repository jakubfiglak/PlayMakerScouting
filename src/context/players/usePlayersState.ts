import { useContext } from 'react';
import playersContext from './playersContext';
import { State } from '../../types/players';

const usePlayersState = (): State => {
  const context = useContext(playersContext);
  if (context === undefined) {
    throw new Error('useAuthState hook must be used within AuthState');
  }

  return context;
};

export default usePlayersState;
