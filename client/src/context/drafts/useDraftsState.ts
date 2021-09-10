import { useContext } from 'react';
import draftsContext from './draftsContext';
import { State } from './types';

export const useDraftsState = (): State => {
  const context = useContext(draftsContext);
  if (context === undefined) {
    throw new Error('useDraftsState hook must be used within DraftsState');
  }

  return context;
};
