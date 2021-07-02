import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { PlayerBasicInfo } from '../types/players';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get clubs list
async function getPlayersList(): Promise<PlayerBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<PlayerBasicInfo[]>>(
    '/api/v1/players/list',
  );
  return data.data;
}

export function usePlayersList() {
  const { setAlert } = useAlertsState();

  return useQuery<PlayerBasicInfo[], ApiError>('playersList', getPlayersList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
