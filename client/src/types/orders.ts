export type Order = {
  _id: string;
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  open: boolean;
  scout?: {
    _id: string;
    name: string;
    surname: string;
  };
  createdAt: string;
  acceptDate?: string;
};

export type OrderFormData = {
  player: string;
};

export type OrdersData = {
  data: Order[];
  total: number;
  pagination: {
    prev?: {
      page: number;
      limit: number;
    };
    next?: {
      page: number;
      limit: number;
    };
  };
};

export type OrdersFilterData = {
  player: string;
  status: 'all' | 'open' | 'accepted';
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
  myOrdersData: Order[];
  orderData: Order | null;
  current: Order | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getOrders: (filters: OrdersFilterData) => void;
  getMyOrders: () => void;
  acceptOrder: (id: string, filters: OrdersFilterData) => void;
  getOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  addOrder: (order: OrderFormData) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'ORDERS_ERROR'; payload: string }
  | { type: 'GET_ORDERS_SUCCESS'; payload: OrdersData }
  | { type: 'GET_ORDER_SUCCESS'; payload: Order }
  | { type: 'GET_MY_ORDERS_SUCCESS'; payload: Order[] }
  | { type: 'ACCEPT_ORDER_SUCCESS' }
  | { type: 'CREATE_ORDER_SUCCESS' }
  | { type: 'DELETE_ORDER_SUCCESS'; payload: string };
