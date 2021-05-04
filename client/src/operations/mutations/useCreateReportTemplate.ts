import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ReportTemplate, ReportTemplateDTO } from '../../types/reportTemplates';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type Response = ApiResponse<ReportTemplate>;

async function createReportTemplate(
  templateData: ReportTemplateDTO,
): Promise<Response> {
  const { data } = await axios.post<Response>(
    '/api/v1/report-templates',
    templateData,
  );
  return data;
}

export function useCreateReportTemplate() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: ReportTemplateDTO) => createReportTemplate(values),
    {
      onSuccess: (data: Response) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('reportTemplates');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
