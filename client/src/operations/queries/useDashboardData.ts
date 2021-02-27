import axios from 'axios';
import { useQuery } from 'react-query';
import { DashboardData } from '../../types/dashboard';
import { ApiError } from '../../types/common';

const getDashboardData = async (): Promise<DashboardData> => {
  const { data } = await axios.get('/api/v1/dashboard');
  return data.data;
};

export const useDashboardData = () =>
  useQuery<DashboardData, ApiError>('dashboard-data', getDashboardData);
