import { useAuthState } from '../context/auth/useAuthState';

export const useAuthenticatedUser = () => {
  const { user } = useAuthState();
  return user!;
};
