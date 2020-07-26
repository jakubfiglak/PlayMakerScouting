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

// export type ClubsFilterData = {
//   name: string;
//   division: Division;
//   voivodeship: string;
// };

// export type GetClubs = (
//   page: number,
//   limit: number,
//   sort: string,
//   order: Order,
//   filters: ClubsFilterData,
// ) => void;

export type State = {
  ordersData: OrdersData;
  current: Order | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getOrders: () => void;
  getOrder: (id: string) => void;
  deleteOrder: (id: string) => void;
  addOrder: (order: OrderFormData) => void;
  setCurrent: (order: Order) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Order }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'ORDERS_ERROR'; payload: string }
  | { type: 'GET_ORDERS_SUCCESS'; payload: OrdersData }
  | { type: 'GET_ORDER_SUCCESS'; payload: Order }
  | { type: 'CREATE_ORDER_SUCCESS' }
  | { type: 'DELETE_ORDER_SUCCESS'; payload: string };
