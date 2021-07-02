import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { ReportBasicInfo } from '../types/reports';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get reports list
async function getReportsList(): Promise<ReportBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<ReportBasicInfo[]>>(
    '/api/v1/reports/list',
  );
  return data.data;
}

export function useReportsList() {
  const { setAlert } = useAlertsState();

  return useQuery<ReportBasicInfo[], ApiError>('reportsList', getReportsList, {
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
