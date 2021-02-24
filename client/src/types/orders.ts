import { PaginationData, SortingOrder } from './common';
import { Position } from './players';

export type OrderStatus = 'open' | 'accepted' | 'closed';

export type Order = {
  _id: string;
  player: {
    _id: string;
    firstName: string;
    lastName: string;
    position: Position;
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

export type OrderBasicInfo = Pick<Order, '_id' | 'player'>;

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
  order: SortingOrder,
  filters: OrdersFilterData,
  scoutId: string | null,
) => void;

export type State = {
  ordersData: OrdersData;
  ordersList: OrderBasicInfo[];
  orderData: Order | null;
  current: Order | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  getOrders: GetOrders;
  getOrdersList: () => void;
  acceptOrder: (id: string) => void;
  getOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  closeOrder: (id: string) => void;
  addOrder: (order: OrderFormData) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'ORDERS_ERROR'; payload: string }
  | { type: 'GET_ORDERS_SUCCESS'; payload: OrdersData }
  | { type: 'GET_ORDERS_LIST_SUCCESS'; payload: OrderBasicInfo[] }
  | { type: 'GET_ORDER_SUCCESS'; payload: Order }
  | { type: 'ACCEPT_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'CREATE_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'CLOSE_ORDER_SUCCESS'; payload: { order: Order; message: string } }
  | { type: 'DELETE_ORDER_SUCCESS'; payload: { id: string; message: string } };
