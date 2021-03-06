import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Club, ClubBasicInfo, ClubDTO, ClubsFilterData } from '../types/clubs';
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

  return useQuery(['clubs', 'list'], getClubsList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Get single club
async function getClub(id: string): Promise<Club> {
  const { data } = await axios.get<ApiResponse<Club>>(`/api/v1/clubs/${id}`);
  return data.data;
}

export function useClub(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['clubs', id], () => getClub(id), {
    initialData: () => {
      const cacheClubs: Club[] = queryClient.getQueryData('clubs') || [];
      return cacheClubs.find((club) => club.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Create new club
async function createClub(clubData: ClubDTO): Promise<ApiResponse<Club>> {
  const { data } = await axios.post<ApiResponse<Club>>(
    '/api/v1/clubs',
    clubData,
  );
  return data;
}

export function useCreateClub() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: ClubDTO) => createClub(values), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('clubs');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Update club
type UpdateClubArgs = { clubId: string; clubData: ClubDTO };

async function updateClub({
  clubId,
  clubData,
}: UpdateClubArgs): Promise<ApiResponse<Club>> {
  const { data } = await axios.put<ApiResponse<Club>>(
    `/api/v1/clubs/${clubId}`,
    clubData,
  );
  return data;
}

export function useUpdateClub(clubId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: ClubDTO) => updateClub({ clubId, clubData: values }),
    {
      onSuccess: (data) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('clubs');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
