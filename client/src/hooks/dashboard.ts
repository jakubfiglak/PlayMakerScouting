import axios from 'axios';
import { useQuery } from 'react-query';
import { DashboardData } from '../types/dashboard';
import { ApiError, ApiResponse } from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';
import { getErrorMessage } from './utils';

const getDashboardData = async (): Promise<DashboardData> => {
  const { data } = await axios.get<ApiResponse<DashboardData>>(
    '/api/v1/dashboard',
  );
  return data.data;
};

export const useDashboardData = () => {
  const { setAlert } = useAlertsState();

  return useQuery<DashboardData, ApiError>('dashboard-data', getDashboardData, {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
};
