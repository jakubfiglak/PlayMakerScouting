import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type Response = ApiResponse<string>;

async function deleteReportTemplate(id: string): Promise<Response> {
  const { data } = await axios.delete<Response>(
    `/api/v1/report-templates/${id}`,
  );
  return data;
}

export function useDeleteReportTemplate() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteReportTemplate(id), {
    onSuccess: (data: Response) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('reportTemplates');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
