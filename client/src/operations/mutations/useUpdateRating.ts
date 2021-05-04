import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Rating, RatingDTO } from '../../types/ratings';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type Args = { id: string; ratingData: RatingDTO };

async function updateRating({
  id,
  ratingData,
}: Args): Promise<ApiResponse<Rating>> {
  const { data } = await axios.put<ApiResponse<Rating>>(
    `/api/v1/ratings/${id}`,
    ratingData,
  );
  return data;
}

export function useUpdateRating() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    ({ id, ratingData }: Args) => updateRating({ id, ratingData }),
    {
      onSuccess: (data: ApiResponse<Rating>) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('ratings');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
