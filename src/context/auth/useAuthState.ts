import { useContext } from 'react';
import authContext from './authContext';

const useAuthState = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within AuthState');
  }

  return context;
};

export default useAuthState;
