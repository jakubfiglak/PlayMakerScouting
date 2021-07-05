import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Player, PlayerBasicInfo, PlayersFilterData } from '../types/players';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all players with pagination
type PaginatedPlayers = PaginatedData<Player>;
type GetPlayersResposne = ApiResponse<PaginatedPlayers>;
type GetPlayersArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
  filters: PlayersFilterData;
};

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

  // Add filters to query url
  Object.entries(filters).forEach(([key, value]) => {
    const regex = key === 'lastName' ? '[regex]' : '';

    const filter = `&${key}${regex}=${value}`;
    if (value.length) {
      playersURI = playersURI.concat(filter);
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

  return useQuery<PaginatedPlayers, ApiError>(
    ['players', { page, limit, sort, order, filters }],
    () => getPlayers({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
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

  return useQuery<PlayerBasicInfo[], ApiError>('playersList', getPlayersList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
