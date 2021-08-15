import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
  Match,
  MatchBasicInfo,
  MatchesFilterData,
  MatchDTO,
} from '../types/matches';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all matches with pagination
type PaginatedMatches = PaginatedData<Match>;
type GetMatchesResponse = ApiResponse<PaginatedMatches>;
type GetMatchesArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
  filters: MatchesFilterData;
};

async function getMatches({
  page = 1,
  limit = 20,
  sort = '-date',
  order,
  filters,
}: GetMatchesArgs): Promise<PaginatedMatches> {
  const orderSign = order === 'desc' ? '-' : '';
  const { club, afterDate, beforeDate } = filters;
  // Generate query url
  const baseURI = club ? `/api/v1/clubs/${club}/matches` : '/api/v1/matches';

  const matchesURI = `${baseURI}?page=${page}&limit=${limit}&sort=${orderSign}${sort}&date[gte]=${afterDate}&date[lte]=${beforeDate}`;

  const { data } = await axios.get<GetMatchesResponse>(matchesURI);
  return data.data;
}

export function useMatches({
  page = 1,
  limit = 20,
  sort = '-date',
  order,
  filters,
}: GetMatchesArgs) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery<PaginatedMatches, ApiError>(
    ['matches', { page, limit, sort, order, filters }],
    () => getMatches({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('matches', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
