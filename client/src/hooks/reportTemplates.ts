import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ReportTemplate, ReportTemplateDTO } from '../types/reportTemplates';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all report templates
async function getReportTemplates(): Promise<ReportTemplate[]> {
  const { data } = await axios.get<ApiResponse<ReportTemplate[]>>(
    '/api/v1/report-templates',
  );
  return data.data;
}

export function useReportTemplates() {
  const { setAlert } = useAlertsState();

  return useQuery<ReportTemplate[], ApiError>(
    'reportTemplates',
    getReportTemplates,
    {
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Create new report template
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

// Update report template
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

// Delete report template
type DeleteResponse = ApiResponse<string>;

async function deleteReportTemplate(id: string): Promise<DeleteResponse> {
  const { data } = await axios.delete<DeleteResponse>(
    `/api/v1/report-templates/${id}`,
  );
  return data;
}

export function useDeleteReportTemplate() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteReportTemplate(id), {
    onSuccess: (data: DeleteResponse) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('reportTemplates');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
