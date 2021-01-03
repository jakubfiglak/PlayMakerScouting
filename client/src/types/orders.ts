import { PaginationData } from './common';

export type OrderStatus = 'open' | 'accepted' | 'closed';

export type Order = {
  _id: string;
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  status: 'open' | 'accepted' | 'closed';
  scout?: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  acceptDate?: string;
  closeDate?: string;
  notes?: string;
};

export type OrderFormData = {
  player: string;
  notes?: string;
};

export type OrdersData = {
  docs: Order[];
} & PaginationData;

export type OrdersFilterData = {
  player: string;
  status: OrderStatus | '';
  createdAfter: string;
  createdBefore: string;
};

export type GetOrders = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: OrdersFilterData,
) => void;

export type State = {
  ordersData: OrdersData;
  myOrdersData: OrdersData;
  orderData: Order | null;
  current: Order | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  getOrders: (filters: OrdersFilterData, page: number) => void;
  getMyOrders: () => void;
  acceptOrder: (id: string) => void;
  getOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  closeOrder: (id: string) => void;
  addOrder: (order: OrderFormData) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'ORDERS_ERROR'; payload: string }
  | { type: 'GET_ORDERS_SUCCESS'; payload: OrdersData }
  | { type: 'GET_ORDER_SUCCESS'; payload: Order }
  | { type: 'GET_MY_ORDERS_SUCCESS'; payload: OrdersData }
  | { type: 'ACCEPT_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'CREATE_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'CLOSE_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'DELETE_ORDER_SUCCESS'; payload: { id: string; message: string } };
