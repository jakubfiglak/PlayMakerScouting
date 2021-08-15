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
  sort = 'date',
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
  sort = 'date',
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

// Create new match
async function createMatch(matchData: MatchDTO): Promise<ApiResponse<Match>> {
  const { data } = await axios.post<ApiResponse<Match>>(
    '/api/v1/matches',
    matchData,
  );
  return data;
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: MatchDTO) => createMatch(values), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('matches');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Update club
type UpdateMatchArgs = { matchId: string; matchData: MatchDTO };

async function updateMatch({
  matchId,
  matchData,
}: UpdateMatchArgs): Promise<ApiResponse<Match>> {
  const { data } = await axios.put<ApiResponse<Match>>(
    `/api/v1/matches/${matchId}`,
    matchData,
  );
  return data;
}

export function useUpdateMatch(matchId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: MatchDTO) => updateMatch({ matchId, matchData: values }),
    {
      onSuccess: (data) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('matches');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
