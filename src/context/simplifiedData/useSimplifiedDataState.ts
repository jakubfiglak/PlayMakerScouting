import { useContext } from 'react';
import simplifiedDataContext from './simplifiedDataContext';
import { State } from '../../types/simplifiedData';

const useSimplifiedDataState = (): State => {
  const context = useContext(simplifiedDataContext);
  if (context === undefined) {
    throw new Error(
      'useSimplifiedDataState hook must be used within SimplifiedDataState',
    );
  }

  return context;
};

export default useSimplifiedDataState;
