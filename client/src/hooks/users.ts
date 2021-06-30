import axios from 'axios';
import { useQuery } from 'react-query';
import { UserBasicInfo } from '../types/users';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get users list
async function getUsersList(): Promise<UserBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<UserBasicInfo[]>>(
    '/api/v1/users/list',
  );
  return data.data;
}

export function useUsersList() {
  const { setAlert } = useAlertsState();

  return useQuery<UserBasicInfo[], ApiError>('usersList', getUsersList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
