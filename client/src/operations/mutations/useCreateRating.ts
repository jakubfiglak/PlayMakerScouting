import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Rating, RatingDTO } from '../../types/ratings';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

async function createRating(
  ratingData: RatingDTO,
): Promise<ApiResponse<Rating>> {
  const { data } = await axios.post<ApiResponse<Rating>>(
    '/api/v1/ratings',
    ratingData,
  );
  return data;
}

export function useCreateRating() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: RatingDTO) => createRating(values), {
    onSuccess: (data: ApiResponse<Rating>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('ratings');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
