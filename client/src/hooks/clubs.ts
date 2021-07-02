import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { ClubBasicInfo } from '../types/clubs';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get clubs list
async function getClubsList(): Promise<ClubBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<ClubBasicInfo[]>>(
    '/api/v1/clubs/list',
  );
  return data.data;
}

export function useClubsList() {
  const { setAlert } = useAlertsState();

  return useQuery<ClubBasicInfo[], ApiError>('clubsList', getClubsList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
