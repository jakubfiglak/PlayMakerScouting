import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { GoToTheMatchDTO, UserBasicInfo, UserFilterData } from '../types/users';
import { User, UserRole } from '../types/auth';
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
  filters: UserFilterData;
};

async function getUsers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetUsersArgs): Promise<PaginatedUsers> {
  const orderSign = order === 'desc' ? '-' : '';

  // Generate query url
  let usersURI = `/api/v1/users?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  // Add filters to query url
  Object.entries(filters).forEach(([key, value]) => {
    const regex = key === 'lastName' || key === 'city' ? '[regex]' : '';

    const filter = `&${key}${regex}=${value}`;
    if (value.length) {
      usersURI = usersURI.concat(filter);
    }
  });

  const { data } = await axios.get<GetUsersResponse>(usersURI);
  return data.data;
}

export function useUsers({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetUsersArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedUsers, ApiError>(
    ['users', { page, limit, sort, order, filters }],
    () => getUsers({ page, limit, sort, order, filters }),
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

// Get single user
async function getUser(id: string): Promise<User> {
  const { data } = await axios.get<ApiResponse<User>>(`/api/v1/users/${id}`);
  return data.data;
}

export function useUser(id: string) {
  const { setAlert } = useAlertsState();

  return useQuery<User, ApiError>(['user', id], () => getUser(id), {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Change user role
type ChangeRoleArgs = { id: string; role: Omit<UserRole, 'admin'> };

async function changeRole({
  id,
  role,
}: ChangeRoleArgs): Promise<ApiResponse<User>> {
  const { data } = await axios.post<ApiResponse<User>>(
    `/api/v1/users/${id}/change-role`,
    { role },
  );
  return data;
}

export function useChangeRole() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    ({ id, role }: ChangeRoleArgs) => changeRole({ id, role }),
    {
      onSuccess: (data: ApiResponse<User>) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('users');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Go to the match
async function goToTheMatch({
  match,
}: GoToTheMatchDTO): Promise<ApiResponse<User>> {
  const { data } = await axios.patch<ApiResponse<User>>(
    `/api/v1/users/go-to-the-match`,
    { match },
  );
  return data;
}

export function useGoToTheMatch() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(({ match }: GoToTheMatchDTO) => goToTheMatch({ match }), {
    onSuccess: (data: ApiResponse<User>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('account');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Leave the match
async function leaveTheMatch(): Promise<ApiResponse<User>> {
  const { data } = await axios.patch<ApiResponse<User>>(
    `/api/v1/users/leave-the-match`,
  );
  return data;
}

export function useLeaveTheMatch() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(() => leaveTheMatch(), {
    onSuccess: (data: ApiResponse<User>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('account');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
