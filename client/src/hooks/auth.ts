import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import {
  ForgotPasswordFormData,
  ResetPasswordFormData,
  User,
} from '../types/auth';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import { getErrorMessage } from './utils';

// Get account info
async function getAccount(): Promise<User> {
  const { data } = await axios.get<ApiResponse<User>>('/api/v1/auth/account');
  return data.data;
}

export function useAccountInfo() {
  const { setAlert } = useAlertsState();

  return useQuery(['account'], () => getAccount(), {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}

// Forgot password
async function forgotPassword(
  forgotPasswordData: ForgotPasswordFormData,
): Promise<ApiResponse<User>> {
  const { data } = await axios.post<ApiResponse<User>>(
    '/api/v1/auth/forgotpassword',
    forgotPasswordData,
  );
  return data;
}

export function useForgotPassword() {
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: ForgotPasswordFormData) => forgotPassword(values),
    {
      onSuccess: () => {
        setAlert({
          msg: 'Na Twój adres email wysłaliśmy informacje o zmianie hasła.',
          type: 'success',
        });
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}

// Reset password
async function resetPassword(
  token: string,
  forgotPasswordData: ResetPasswordFormData,
): Promise<ApiResponse<User>> {
  const { data } = await axios.patch<ApiResponse<User>>(
    `/api/v1/auth/resetpassword/${token}`,
    forgotPasswordData,
  );
  return data;
}

export function useResetPassword(token: string) {
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: ResetPasswordFormData) => resetPassword(token, values),
    {
      onSuccess: () => {
        setAlert({
          msg:
            'Proces resetowania hasła przebiegł pomyślnie. Możesz zalogować się do aplikacji.',
          type: 'success',
        });
      },
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}
