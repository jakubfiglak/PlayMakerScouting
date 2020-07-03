import { useContext } from 'react';
import simplifiedDataContext from './simplifiedDataContext';
import { State } from '../../types/simplifiedData';

const useSimplifiedDataState = (): State => {
  const context = useContext(simplifiedDataContext);
  if (context === undefined) {
    throw new Error('useAuthState hook must be used within AuthState');
  }

  return context;
};

export default useSimplifiedDataState;
