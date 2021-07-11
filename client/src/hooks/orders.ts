import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import {
  Order,
  OrderBasicInfo,
  OrderDTO,
  OrdersFilterData,
} from '../types/orders';
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
  const queryClient = useQueryClient();

  return useQuery<PaginatedOrders, ApiError>(
    ['orders', { page, limit, sort, order, filters }],
    () => getOrders({ page, limit, sort, order, filters }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        queryClient.setQueryData('orders', data.docs);
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Get orders list
async function getOrdersList(): Promise<OrderBasicInfo[]> {
  const { data } = await axios.get<ApiResponse<OrderBasicInfo[]>>(
    '/api/v1/orders/mylist',
  );
  return data.data;
}

export function useOrdersList() {
  const queryClient = useQueryClient();

  return useQuery(['orders', 'list'], getOrdersList, {
    retry: false,
    onError: () => queryClient.setQueryData(['orders', 'list'], []),
  });
}

// Get single order
async function getOrder(id: string): Promise<Order> {
  const { data } = await axios.get<ApiResponse<Order>>(`/api/v1/orders/${id}`);
  return data.data;
}

export function useOrder(id: string) {
  const { setAlert } = useAlertsState();
  const queryClient = useQueryClient();

  return useQuery(['orders', id], () => getOrder(id), {
    initialData: () => {
      const cacheOrders: Order[] = queryClient.getQueryData('orders') || [];
      return cacheOrders.find((order) => order.id === id);
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Create new order
async function createOrder(orderData: OrderDTO): Promise<ApiResponse<Order>> {
  const { data } = await axios.post<ApiResponse<Order>>(
    '/api/v1/orders',
    orderData,
  );
  return data;
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((values: OrderDTO) => createOrder(values), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Update order
type UpdateOrderArgs = { orderId: string; orderData: OrderDTO };

async function updateOrder({
  orderId,
  orderData,
}: UpdateOrderArgs): Promise<ApiResponse<Order>> {
  const { data } = await axios.put<ApiResponse<Order>>(
    `/api/v1/orders/${orderId}`,
    orderData,
  );
  return data;
}

export function useUpdateOrder(orderId: string) {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: OrderDTO) => updateOrder({ orderId, orderData: values }),
    {
      onSuccess: (data) => {
        setAlert({ msg: data.message, type: 'success' });
        queryClient.invalidateQueries('orders');
      },
      onError: (err: ApiError) =>
        setAlert({ msg: err.response.data.error, type: 'error' }),
    },
  );
}

// Delete order
async function deleteOrder(id: string): Promise<ApiResponse<string>> {
  const { data } = await axios.delete<ApiResponse<string>>(
    `/api/v1/orders/${id}/accept`,
  );
  return data;
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => deleteOrder(id), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Accept order
async function acceptOrder(id: string): Promise<ApiResponse<Order>> {
  const { data } = await axios.post<ApiResponse<Order>>(
    `/api/v1/orders/${id}/accept`,
  );
  return data;
}

export function useAcceptOrder() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => acceptOrder(id), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
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
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}

// Close order
async function closeOrder(id: string): Promise<ApiResponse<Order>> {
  const { data } = await axios.post<ApiResponse<Order>>(
    `/api/v1/orders/${id}/close`,
  );
  return data;
}

export function useCloseOrder() {
  const queryClient = useQueryClient();
  const { setAlert } = useAlertsState();

  return useMutation((id: string) => closeOrder(id), {
    onSuccess: (data) => {
      setAlert({ msg: data.message, type: 'success' });
      queryClient.invalidateQueries('orders');
    },
    onError: (err: ApiError) =>
      setAlert({ msg: err.response.data.error, type: 'error' }),
  });
}
