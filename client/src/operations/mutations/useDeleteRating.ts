import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type Response = ApiResponse<string>;

async function deleteRating(id: string): Promise<Response> {
  const { data } = await axios.delete<Response>(`/api/v1/ratings/${id}`);
  return data;
}

export function useDeleteRating() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: string) => deleteRating(values), {
    onSuccess: (data: Response) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('ratings');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
