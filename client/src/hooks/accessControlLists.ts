import axios from 'axios';
import { useMutation } from 'react-query';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import { AccessControlList, GrantAccessDTO } from '../types/accessControlLists';
import { getErrorMessage } from './utils';

// Grant access to the asset
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
  const { setAlert } = useAlertsState();

  return useMutation((values: GrantAccessDTO) => grantAccess(values), {
    onSuccess: (data: ApiResponse<AccessControlList>) => {
      setAlert({ msg: data.message, type: 'success' });
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
