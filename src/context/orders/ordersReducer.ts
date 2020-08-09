import { State, Action } from '../../types/orders';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ordersData: {
          data: action.payload.data,
          total: action.payload.total,
          pagination: action.payload.pagination,
        },
      };

    case 'GET_MY_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        myOrdersData: action.payload,
      };

    case 'GET_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        orderData: action.payload,
      };

    case 'ACCEPT_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DELETE_ORDER_SUCCESS':
      return {
        ...state,
        ordersData: {
          data: state.ordersData.data.filter(
            (order) => order._id !== action.payload,
          ),
          total: state.ordersData.total - 1,
          pagination: state.ordersData.pagination,
        },
        loading: false,
        error: null,
      };

    case 'ORDERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
