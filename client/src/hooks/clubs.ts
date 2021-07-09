import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Club, ClubBasicInfo, ClubsFilterData } from '../types/clubs';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all clubs with pagination
type PaginatedClubs = PaginatedData<Club>;
type GetClubsResponse = ApiResponse<PaginatedClubs>;
type GetClubsArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
  filters: ClubsFilterData;
};

async function getClubs({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetClubsArgs) {
  const orderSign = order === 'desc' ? '-' : '';

  // Generate query url
  let clubsURI = `/api/v1/clubs?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  Object.entries(filters).forEach(([key, value]) => {
    const regex = key === 'name' || key === 'voivodeship' ? '[regex]' : '';
    const filter = `&${key}${regex}=${value}`;

    if (value) {
      clubsURI = clubsURI.concat(filter);
    }
  });

  const { data } = await axios.get<GetClubsResponse>(clubsURI);
  return data.data;
}

export function useClubs({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetClubsArgs) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(
    ['clubs', { page, limit, sort, order, filters }],
    () => getClubs({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('clubs', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get clubs list
async function getClubsList(): Promise<ClubBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<ClubBasicInfo[]>>(
    '/api/v1/clubs/list',
  );
  return data.data;
}

export function useClubsList() {
  const { setAlert } = useAlertsState();

  return useQuery('clubsList', getClubsList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
