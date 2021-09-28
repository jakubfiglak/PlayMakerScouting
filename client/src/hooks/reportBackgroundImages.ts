import axios from 'axios';
import { useQuery } from 'react-query';
import { ReportBackgroundImage } from '../types/reportBackgroundImages';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import { getErrorMessage } from './utils';

// Get all report background images
async function getReportBackgroundImages(): Promise<ReportBackgroundImage[]> {
  const { data } = await axios.get<ApiResponse<ReportBackgroundImage[]>>(
    '/api/v1/report-background-images',
  );
  return data.data;
}

export function useReportBackgroundImages() {
  const { setAlert } = useAlertsState();

  return useQuery<ReportBackgroundImage[], ApiError>(
    'reportBackgroundImages',
    getReportBackgroundImages,
    {
      onError: (err: ApiError) =>
        setAlert({
          msg: getErrorMessage(err.response.data.error),
          type: 'error',
        }),
    },
  );
}
