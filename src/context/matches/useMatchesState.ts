import { useContext } from 'react';
import matchesContext from './matchesContext';
import { State } from '../../types/matches';

const useMatchesState = (): State => {
  const context = useContext(matchesContext);
  if (context === undefined) {
    throw new Error('useMatchesState hook must be used within MatchesState');
  }

  return context;
};

export default useMatchesState;
