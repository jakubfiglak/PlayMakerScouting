import { useContext } from 'react';
import authContext from './authContext';
import { State } from '../../types/auth';

export const useAuthState = (): State => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuthState hook must be used within AuthState');
  }

  return context;
};
