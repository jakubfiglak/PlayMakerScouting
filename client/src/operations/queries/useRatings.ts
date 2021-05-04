import axios from 'axios';
import { useQuery } from 'react-query';
import { Rating } from '../../types/ratings';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

async function getRatings(): Promise<Rating[]> {
  const { data } = await axios.get<ApiResponse<Rating[]>>('/api/v1/ratings');
  return data.data;
}

export function useRatings() {
  const { setAlert } = useAlertsState();

  return useQuery<Rating[], ApiError>('ratings', getRatings, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
