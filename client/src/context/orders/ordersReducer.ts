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
