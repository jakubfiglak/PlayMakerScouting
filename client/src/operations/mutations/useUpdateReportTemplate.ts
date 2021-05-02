import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ReportTemplate, ReportTemplateDTO } from '../../types/reportTemplates';
import { ApiError, ApiResponse } from '../../types/common';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type Response = ApiResponse<ReportTemplate>;
type Args = { id: string; templateData: ReportTemplateDTO };

async function updateReportTemplate({
  id,
  templateData,
}: Args): Promise<Response> {
  const { data } = await axios.put<Response>(
    `/api/v1/report-templates/${id}`,
    templateData,
  );
  return data;
}

export function useUpdateReportTemplate() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    ({ id, templateData }: Args) => updateReportTemplate({ id, templateData }),
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
