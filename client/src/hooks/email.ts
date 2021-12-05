import axios from 'axios';
import { useMutation } from 'react-query';
import { getErrorMessage } from './utils';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

import { Email } from '../types/email';

// Send contact form email
async function sendEmail(emailData: Email): Promise<ApiResponse<Email>> {
  const { data } = await axios.post<ApiResponse<Email>>(
    '/api/v1/email',
    emailData,
  );
  return data;
}

export function useSendEmail() {
  const { setAlert } = useAlertsState();

  return useMutation((values: Email) => sendEmail(values), {
    onSuccess: () => {
      setAlert({
        msg: 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.',
        type: 'success',
      });
    },
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
}
