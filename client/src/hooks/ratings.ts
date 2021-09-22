import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Rating, RatingDTO } from '../types/ratings';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
  getErrorMessage,
  getUpdateSuccessMessage,
} from './utils';

// Get all ratings
async function getRatings(): Promise<Rating[]> {
  const { data } = await axios.get<ApiResponse<Rating[]>>('/api/v1/ratings');
  return data.data;
}

export function useRatings() {
  const { setAlert } = useAlertsState();

  return useQuery<Rating[], ApiError>('ratings', getRatings, {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Create new rating
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
      setAlert({
        msg: getCreateSuccessMessage({ type: 'cechę', name: data.data.name }),
        type: 'success',
      });
      queryClient.invalidateQueries('ratings');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Update rating
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
        setAlert({
          msg: getUpdateSuccessMessage({ type: 'cechę', name: data.data.name }),
          type: 'success',
        });
        queryClient.invalidateQueries('ratings');
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Delete rating
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
      setAlert({
        msg: getDeleteSuccessMessage({ type: 'cechę', id: data.data }),
        type: 'success',
      });
      queryClient.invalidateQueries('ratings');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
