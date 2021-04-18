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
        ordersData: action.payload,
      };

    case 'GET_ORDERS_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ordersList: action.payload,
      };

    case 'GET_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        orderData: action.payload,
      };

    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        ordersData: {
          ...state.ordersData,
          docs: [action.payload.order, ...state.ordersData.docs],
        },
      };

    case 'ACCEPT_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        ordersData: {
          ...state.ordersData,
          docs: state.ordersData.docs.map((order) =>
            order.id === action.payload.order.id ? action.payload.order : order,
          ),
        },
        orderData: action.payload.order,
      };

    case 'CLOSE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        ordersData: {
          ...state.ordersData,
          docs: state.ordersData.docs.map((order) =>
            order.id === action.payload.order.id ? action.payload.order : order,
          ),
        },
        orderData: action.payload.order,
      };

    case 'DELETE_ORDER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        ordersData: {
          ...state.ordersData,
          docs: state.ordersData.docs.filter(
            (order) => order.id !== action.payload.id,
          ),
        },
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
