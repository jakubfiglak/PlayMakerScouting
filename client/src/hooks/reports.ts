import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
  Report,
  ReportBasicInfo,
  ReportDTO,
  ReportsFilterData,
  ReportStatus,
} from '../types/reports';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  GetPaginatedDataArgs,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

type PaginatedReports = PaginatedData<Report>;
type GetReportsResponse = ApiResponse<PaginatedReports>;
type GetReportsArgs = GetPaginatedDataArgs & {
  filters: ReportsFilterData;
};
type GetPlayersReportsArgs = GetPaginatedDataArgs & { playerId: string };
type GetOrdersReportsArgs = GetPaginatedDataArgs & { orderId: string };

// Get all reports with pagination
async function getReports({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetReportsArgs): Promise<PaginatedReports> {
  const orderSign = order === 'desc' ? '-' : '';

  // Generate query url
  let reportsURI = `/api/v1/reports?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  if (filters.player) {
    reportsURI = reportsURI.concat(`&player=${filters.player}`);
  }

  const { data } = await axios.get<GetReportsResponse>(reportsURI);
  return data.data;
}

export function useReports({
  page = 1,
  limit = 20,
  sort = '_id',
  order,
  filters,
}: GetReportsArgs) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery<PaginatedReports, ApiError>(
    ['reports', { page, limit, sort, order, filters }],
    () => getReports({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('reports', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get all reports for a player with pagination
async function getPlayersReports({
  playerId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetPlayersReportsArgs): Promise<PaginatedReports> {
  const orderSign = order === 'desc' ? '-' : '';
  const reportsURI = `/api/v1/players/${playerId}/reports?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetReportsResponse>(reportsURI);
  return data.data;
}

export function usePlayersReports({
  playerId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetPlayersReportsArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedReports, ApiError>(
    ['reports', { playerId }, { page, limit, sort, order }],
    () => getPlayersReports({ playerId, page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get all reports for an order with pagination
async function getOrdersReports({
  orderId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetOrdersReportsArgs): Promise<PaginatedReports> {
  const orderSign = order === 'desc' ? '-' : '';
  const reportsURI = `/api/v1/orders/${orderId}/reports?page=${page}&limit=${limit}&sort=${orderSign}${sort}`;

  const { data } = await axios.get<GetReportsResponse>(reportsURI);
  return data.data;
}

export function useOrdersReports({
  orderId,
  page = 1,
  limit = 20,
  sort = '_id',
  order,
}: GetOrdersReportsArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedReports, ApiError>(
    ['reports', { orderId }, { page, limit, sort, order }],
    () => getOrdersReports({ orderId, page, limit, sort, order }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

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

// Get single report
async function getReport(id: string): Promise<Report> {
  const { data } = await axios.get<ApiResponse<Report>>(
    `/api/v1/reports/${id}`,
  );
  return data.data;
}

export function useReport(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['reports', id], () => getReport(id), {
    initialData: () => {
      const cacheReports: Report[] = queryClient.getQueryData('reports') || [];
      return cacheReports.find((report) => report.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Create new report
async function createReport(
  reportData: ReportDTO,
): Promise<ApiResponse<Report>> {
  const { data } = await axios.post<ApiResponse<Report>>(
    '/api/v1/reports',
    reportData,
  );
  return data;
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: ReportDTO) => createReport(values), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('reports');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Update report
type UpdateReportArgs = { reportId: string; reportData: ReportDTO };

async function updateReport({
  reportId,
  reportData,
}: UpdateReportArgs): Promise<ApiResponse<Report>> {
  const { data } = await axios.put<ApiResponse<Report>>(
    `/api/v1/reports/${reportId}`,
    reportData,
  );
  return data;
}

export function useUpdateReport(reportId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: ReportDTO) => updateReport({ reportId, reportData: values }),
    {
      onSuccess: (data) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('reports');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Set report status
export type SetReportStatusArgs = { id: string; status: ReportStatus };

async function setReportStatus({
  id,
  status,
}: SetReportStatusArgs): Promise<ApiResponse<Report>> {
  const { data } = await axios.patch<ApiResponse<Report>>(
    `/api/v1/reports/${id}/set-status`,
    { status },
  );
  return data;
}

export function useSetReportStatus() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    ({ id, status }: SetReportStatusArgs) => setReportStatus({ id, status }),
    {
      onSuccess: (data: ApiResponse<Report>) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('reports');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}
