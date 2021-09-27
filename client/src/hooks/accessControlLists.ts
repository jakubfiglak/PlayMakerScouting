import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import { AccessControlList, GrantAccessDTO } from '../types/accessControlLists';
import { getErrorMessage } from './utils';

// Get all Access Control Lists
async function getAccessControlLists(): Promise<AccessControlList[]> {
  const { data } = await axios.get<ApiResponse<AccessControlList[]>>(
    '/api/v1/access-control-lists',
  );
  return data.data;
}

export function useAccessControlLists() {
  const { setAlert } = useAlertsState();

  return useQuery(['accessControlLists'], getAccessControlLists, {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Grant access
async function grantAccess(
  grantAccessData: GrantAccessDTO,
): Promise<ApiResponse<AccessControlList>> {
  const { data } = await axios.patch<ApiResponse<AccessControlList>>(
    '/api/v1/access-control-lists/grant-access',
    grantAccessData,
  );
  return data;
}

export function useGrantAccess() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: GrantAccessDTO) => grantAccess(values), {
    onSuccess: () => {
      setAlert({ msg: 'Pomyślnie nadano dostępy', type: 'success' });
      queryClient.invalidateQueries('accessControlLists');
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
