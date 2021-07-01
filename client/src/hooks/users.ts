import axios from 'axios';
import { useQuery } from 'react-query';
import { UserBasicInfo } from '../types/users';
import { User } from '../types/auth';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all users with pagination
type PaginatedUsers = PaginatedData<User>;
type GetUsersResponse = ApiResponse<PaginatedUsers>;
type GetUsersArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
};

async function getUsers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetUsersArgs): Promise<PaginatedUsers> {
  const orderSign = order === 'desc' ? '-' : '';

  const { data } = await axios.get<GetUsersResponse>(
    `/api/v1/users?page=${page}&limit=${limit}&sort=${orderSign}${sort}`,
  );
  return data.data;
}

export function useUsers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetUsersArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedUsers, ApiError>(
    ['users', { page, limit, sort, order }],
    () => getUsers({ page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get users list
async function getUsersList(): Promise<UserBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<UserBasicInfo[]>>(
    '/api/v1/users/list',
  );
  return data.data;
}

export function useUsersList() {
  const { setAlert } = useAlertsState();

  return useQuery<UserBasicInfo[], ApiError>('usersList', getUsersList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
