import { useAuthState } from '../context';

export const useAuthenticatedUser = () => {
  const { user } = useAuthState();
  return user!;
};
