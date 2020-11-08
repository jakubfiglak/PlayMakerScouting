import { useContext } from 'react';
import usersContext from './usersContext';
import { State } from '../../types/users';

export const useUsersState = (): State => {
  const context = useContext(usersContext);
  if (context === undefined) {
    throw new Error('useUsersContext hook must be used within UsersState');
  }

  return context;
};
