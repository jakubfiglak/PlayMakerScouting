import axios from 'axios';
import { useQuery } from 'react-query';
import { DashboardData, LandingData } from '../types/dashboard';
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

const getLandingData = async (): Promise<LandingData> => {
  const { data } = await axios.get<ApiResponse<LandingData>>(
    '/api/v1/dashboard/landing',
  );
  return data.data;
};

export const useLandingData = () => {
  const { setAlert } = useAlertsState();

  return useQuery<LandingData, ApiError>('landing-data', getLandingData, {
    onError: (err: ApiError) =>
      setAlert({
        msg: getErrorMessage(err.response.data.error),
        type: 'error',
      }),
  });
};
