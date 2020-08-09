import { useContext } from 'react';
import clubsContext from './clubsContext';
import { State } from '../../types/clubs';

export const useClubsState = (): State => {
  const context = useContext(clubsContext);
  if (context === undefined) {
    throw new Error('useClubsState hook must be used within ClubsState');
  }

  return context;
};
