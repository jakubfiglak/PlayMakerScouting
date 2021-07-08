import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Order, OrdersFilterData } from '../types/orders';
import {
  ApiError,
  ApiResponse,
  PaginatedData,
  SortingOrder,
} from '../types/common';
import { useAlertsState } from '../context/alerts/useAlertsState';

// Get all orders with pagination
type PaginatedOrders = PaginatedData<Order>;
type GetOrdersResponse = ApiResponse<PaginatedOrders>;
type GetOrdersArgs = {
  page?: number;
  limit?: number;
  sort?: string;
  order: SortingOrder;
  filters: OrdersFilterData;
};

async function getOrders({
  page = 1,
  limit = 20,
  sort = '-createdAt',
  order,
  filters,
}: GetOrdersArgs): Promise<PaginatedOrders> {
  const orderSign = order === 'desc' ? '-' : '';
  const { createdAfter, createdBefore, player, status } = filters;
  // Generate query url
  let ordersURI = `/api/v1/orders?page=${page}&limit=${limit}&sort=${orderSign}${sort}&createdAt[gte]=${createdAfter}&createdAt[lte]=${createdBefore}`;

  if (player) {
    ordersURI = ordersURI.concat(`&player=${player}`);
  }

  if (status) {
    ordersURI = ordersURI.concat(`&status=${status}`);
  }

  const { data } = await axios.get<GetOrdersResponse>(ordersURI);
  return data.data;
}

export function useOrders({
  page = 1,
  limit = 20,
  sort = '-createdAt',
  order,
  filters,
}: GetOrdersArgs) {
  const { setAlert } = useAlertsState();

  return useQuery<PaginatedOrders, ApiError>(
    ['orders', { page, limit, sort, order, filters }],
    () => getOrders({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Reject accepted order
async function rejectOrder(id: string): Promise<ApiResponse<Order>> {
  const { data } = await axios.post<ApiResponse<Order>>(
    `/api/v1/orders/${id}/reject`,
  );
  return data;
}

export function useRejectOrder() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => rejectOrder(id), {
    onSuccess: (data: ApiResponse<Order>) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
