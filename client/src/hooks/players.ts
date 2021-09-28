import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
  Player,
  PlayerBasicInfo,
  PlayerDTO,
  PlayersFilterData,
} from '../types/players';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  GetPaginatedDataArgs,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import {
  getCreateSuccessMessage,
  getDeleteSuccessMessage,
  getErrorMessage,
  getUpdateSuccessMessage,
} from './utils';

type PaginatedPlayers = PaginatedData<Player>;
type GetPlayersResposne = ApiResponse<PaginatedPlayers>;
type GetPlayersArgs = GetPaginatedDataArgs & {
  filters: PlayersFilterData;
};
type GetClubsPlayersArgs = GetPaginatedDataArgs & {
  clubId: string;
};

// Get all players with pagination
async function getPlayers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetPlayersArgs): Promise<PaginatedPlayers> {
  const orderSign = order === 'desc' ? '-' : '';

  // Generate query url
  let playersURI = `/api/v1/players?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  Object.entries(filters).forEach(([key, value]) => {
    if (key === 'bornBefore' || key === 'bornAfter') {
      const matcher = key === 'bornBefore' ? '[lte]' : '[gte]';
      if (value) {
        playersURI = playersURI.concat(`&yearOfBirth${matcher}=${value}`);
      }
    } else {
      const regex = key === 'lastName' ? '[regex]' : '';

      const filter = `&${key}${regex}=${value}`;
      if (value && value.toString().length) {
        playersURI = playersURI.concat(filter);
      }
    }
  });

  const { data } = await axios.get<GetPlayersResposne>(playersURI);
  return data.data;
}

export function usePlayers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetPlayersArgs) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery<PaginatedPlayers, ApiError>(
    ['players', { page, limit, sort, order, filters }],
    () => getPlayers({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('players', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get all players for a club with pagination
async function getClubsPlayers({
  clubId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetClubsPlayersArgs): Promise<PaginatedPlayers> {
  const orderSign = order === 'desc' ? '-' : '';
  const playersURI = `/api/v1/clubs/${clubId}/players?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetPlayersResposne>(playersURI);
  return data.data;
}

export function useClubsPlayers({
  clubId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetClubsPlayersArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedPlayers, ApiError>(
    ['players', { clubId }, { page, limit, sort, order }],
    () => getClubsPlayers({ clubId, page, limit, sort, order }),
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

// Get players list
async function getPlayersList(): Promise<PlayerBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<PlayerBasicInfo[]>>(
    '/api/v1/players/list',
  );
  return data.data;
}

export function usePlayersList() {
  const { setAlert } = useAlertsState();

  return useQuery<PlayerBasicInfo[], ApiError>(
    ['players', 'list'],
    getPlayersList,
    {
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Get single player
async function getPlayer(id: string): Promise<Player> {
  const { data } = await axios.get<ApiResponse<Player>>(
    `/api/v1/players/${id}`,
  );
  return data.data;
}

export function usePlayer(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['players', id], () => getPlayer(id), {
    initialData: () => {
      const cachePlayers: Player[] = queryClient.getQueryData('players') || [];
      return cachePlayers.find((player) => player.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Create new player
async function createPlayer(
  playerData: PlayerDTO,
): Promise<ApiResponse<Player>> {
  const { data } = await axios.post<ApiResponse<Player>>(
    '/api/v1/players',
    playerData,
  );
  return data;
}

export function useCreatePlayer() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: PlayerDTO) => createPlayer(values), {
    onSuccess: (data) => {
      setAlert({
        msg: getCreateSuccessMessage({
          type: 'zawodnika',
          name: `${data.data.lastName} ${data.data.firstName}`,
        }),
        type: 'success',
      });
      queryClient.invalidateQueries('players');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Update player
type UpdatePlayerArgs = { playerId: string; playerData: PlayerDTO };

async function updatePlayer({
  playerId,
  playerData,
}: UpdatePlayerArgs): Promise<ApiResponse<Player>> {
  const { data } = await axios.put<ApiResponse<Player>>(
    `/api/v1/players/${playerId}`,
    playerData,
  );
  return data;
}

export function useUpdatePlayer(playerId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: PlayerDTO) => updatePlayer({ playerId, playerData: values }),
    {
      onSuccess: (data) => {
        setAlert({
          msg: getUpdateSuccessMessage({
            type: 'zawodnika',
            name: `${data.data.lastName} ${data.data.firstName}`,
          }),
          type: 'success',
        });
        queryClient.invalidateQueries('players');
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Delete player
async function deletePlayer(id: string): Promise<ApiResponse<string>> {
  const { data } = await axios.delete<ApiResponse<string>>(
    `/api/v1/players/${id}`,
  );
  return data;
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deletePlayer(id), {
    onSuccess: (data) => {
      setAlert({
        msg: getDeleteSuccessMessage({ type: 'zawodnika', id: data.data }),
        type: 'success',
      });
      queryClient.invalidateQueries('players');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Merge players duplicates
async function mergePlayersDuplicates(): Promise<ApiResponse<null>> {
  const { data } = await axios.post<ApiResponse<null>>(
    '/api/v1/players/merge-duplicates',
  );
  return data;
}

export function useMergePlayersDuplicates() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(mergePlayersDuplicates, {
    onSuccess: () => {
      setAlert({
        msg: 'Pomyślnie scalono duplikaty definicji zawodników',
        type: 'success',
      });
      queryClient.invalidateQueries('players');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
