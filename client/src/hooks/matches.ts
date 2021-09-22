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
  GetPaginatedDataArgs,
  PaginatedData,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
  getErrorMessage,
  getUpdateSuccessMessage,
} from './utils';

type PaginatedMatches = PaginatedData<Match>;
type GetMatchesResponse = ApiResponse<PaginatedMatches>;
type GetMatchesArgs = GetPaginatedDataArgs & { filters: MatchesFilterData };
type GetClubsMatchesArgs = GetPaginatedDataArgs & { clubId: string };

// Get all matches with pagination
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
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get all matches for a club with pagination
async function getClubsMatches({
  clubId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetClubsMatchesArgs): Promise<PaginatedMatches> {
  const orderSign = order === 'desc' ? '-' : '';
  const matchesURI = `/api/v1/clubs/${clubId}/matches?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetMatchesResponse>(matchesURI);
  return data.data;
}

export function useClubsMatches({
  clubId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetClubsMatchesArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedMatches, ApiError>(
    ['matches', { clubId }, { page, limit, sort, order }],
    () => getClubsMatches({ clubId, page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get matches list
async function getMatchesList(): Promise<MatchBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<MatchBasicInfo[]>>(
    '/api/v1/matches/list',
  );
  return data.data;
}

export function useMatchesList() {
  const { setAlert } = useAlertsState();

  return useQuery(['matches', 'list'], getMatchesList, {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Get single match
async function getMatch(id: string): Promise<Match> {
  const { data } = await axios.get<ApiResponse<Match>>(`/api/v1/matches/${id}`);
  return data.data;
}

export function useMatch(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['matches', id], () => getMatch(id), {
    initialData: () => {
      const cacheMatches: Match[] = queryClient.getQueryData('matches') || [];
      return cacheMatches.find((match) => match.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
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
      setAlert({
        msg: getCreateSuccessMessage({
          type: 'mecz',
          name: `${data.data.homeTeam.name} - ${data.data.awayTeam.name}`,
        }),
        type: 'success',
      });
      queryClient.invalidateQueries('matches');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
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
        setAlert({
          msg: getUpdateSuccessMessage({
            type: 'mecz',
            name: `${data.data.homeTeam.name} - ${data.data.awayTeam.name}`,
          }),
          type: 'success',
        });
        queryClient.invalidateQueries('matches');
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Delete match
async function deleteMatch(id: string): Promise<ApiResponse<string>> {
  const { data } = await axios.delete<ApiResponse<string>>(
    `/api/v1/matches/${id}`,
  );
  return data;
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteMatch(id), {
    onSuccess: (data) => {
      setAlert({
        msg: getDeleteSuccessMessage({ type: 'mecz', id: data.data }),
        type: 'success',
      });
      queryClient.invalidateQueries('matches');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
