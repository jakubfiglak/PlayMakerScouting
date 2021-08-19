import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../types/auth';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get account info
async function getAccount(): Promise<User> {
  const { data } = await axios.get<ApiResponse<User>>('/api/v1/auth/account');
  return data.data;
}

export function useAccountInfo() {
  const { setAlert } = useAlertsState();

  return useQuery(['account'], () => getAccount(), {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
