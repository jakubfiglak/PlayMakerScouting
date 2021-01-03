import React, { useReducer } from 'react';
import { axiosJson } from '../../config/axios';
import OrdersContext from './ordersContext';
import ordersReducer from './ordersReducer';
import { SortingOrder } from '../../types/common';
import { State, OrderFormData, OrdersFilterData } from '../../types/orders';
import { initialPaginatedData } from '../../data';

export const OrdersState: React.FC = ({ children }) => {
  const initialState: State = {
    ordersData: initialPaginatedData,
    myOrdersData: initialPaginatedData,
    orderData: null,
    current: null,
    loading: false,
    error: null,
    message: null,
    setLoading: () => null,
    clearErrors: () => null,
    clearMessage: () => null,
    getOrders: () => null,
    getMyOrders: () => null,
    acceptOrder: () => null,
    getOrder: () => null,
    deleteOrder: () => null,
    closeOrder: () => null,
    addOrder: () => null,
  };

  const [state, dispatch] = useReducer(ordersReducer, initialState);

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    });
  };

  // Get orders
  const getOrders = async (
    page = 1,
    limit = 20,
    sort = '-createdAt',
    order: SortingOrder,
    filters: OrdersFilterData,
  ) => {
    setLoading();
    const orderSign = order === 'desc' ? '-' : '';

    const { player, status, createdAfter, createdBefore } = filters;

    let ordersURI = `/api/v1/orders?page=${page}&limit=${limit}&sort=${orderSign}${sort}&createdAt[gte]=${createdAfter}&createdAt[lte]=${createdBefore}`;

    if (player) {
      ordersURI = ordersURI.concat(`&player=${player}`);
    }

    if (status) {
      ordersURI = ordersURI.concat(`&status=${status}`);
    }

    try {
      const res = await axiosJson.get(ordersURI);
      dispatch({
        type: 'GET_ORDERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get my orders
  const getMyOrders = async () => {
    setLoading();

    try {
      const res = await axiosJson.get('/api/v1/orders/my');
      dispatch({
        type: 'GET_MY_ORDERS_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: 'err.response.data.error',
      });
    }
  };

  // Accept order
  const acceptOrder = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.post(`/api/v1/orders/${id}/accept`);
      dispatch({
        type: 'ACCEPT_ORDER_SUCCESS',
        payload: { order: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Get order
  const getOrder = async (id: string) => {
    setLoading();

    try {
      const res = await axiosJson.get(`/api/v1/orders/${id}`);
      dispatch({
        type: 'GET_ORDER_SUCCESS',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Create new order
  const addOrder = async (order: OrderFormData) => {
    setLoading();

    try {
      const res = await axiosJson.post('/api/v1/orders', order);
      dispatch({
        type: 'CREATE_ORDER_SUCCESS',
        payload: { order: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Delete order
  const deleteOrder = async (id: string) => {
    setLoading();
    try {
      const res = await axiosJson.delete(`/api/v1/orders/${id}`);
      dispatch({
        type: 'DELETE_ORDER_SUCCESS',
        payload: { id, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Close order
  const closeOrder = async (id: string) => {
    setLoading();
    try {
      const res = await axiosJson.post(`/api/v1/orders/${id}/close`);
      dispatch({
        type: 'CLOSE_ORDER_SUCCESS',
        payload: { order: res.data.data, message: res.data.message },
      });
    } catch (err) {
      dispatch({
        type: 'ORDERS_ERROR',
        payload: err.response.data.error,
      });
    }
  };

  // Clear errors
  const clearErrors = () =>
    dispatch({
      type: 'CLEAR_ERRORS',
    });

  // Clear message
  const clearMessage = () =>
    dispatch({
      type: 'CLEAR_MESSAGE',
    });

  const {
    ordersData,
    myOrdersData,
    orderData,
    current,
    loading,
    error,
    message,
  } = state;

  return (
    <OrdersContext.Provider
      value={{
        ordersData,
        myOrdersData,
        orderData,
        current,
        loading,
        error,
        message,
        setLoading,
        getOrders,
        getMyOrders,
        acceptOrder,
        getOrder,
        deleteOrder,
        addOrder,
        closeOrder,
        clearErrors,
        clearMessage,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
