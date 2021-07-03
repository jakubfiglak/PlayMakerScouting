import axios from 'axios';
import { useQuery } from 'react-query';
import { ReportTemplate } from '../types/reportTemplates';
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
