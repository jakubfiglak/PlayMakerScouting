import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Custom components
import { OrderDetails } from './OrderDetails';
import { MainTemplate } from '../../templates/MainTemplate';
import { Loader } from '../../components/Loader';
// Hooks
import { useAlert } from '../../hooks/useAlert';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useOrdersState } from '../../context/orders/useOrdersState';

type ParamTypes = {
  id: string;
};

export const OrderPage = () => {
  const params = useParams<ParamTypes>();
  const user = useAuthenticatedUser();
  const {
    loading,
    orderData,
    getOrder,
    acceptOrder,
    closeOrder,
    error,
    message,
    clearErrors,
    clearMessage,
  } = useOrdersState();

  const { id } = params;

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

  useEffect(() => {
    getOrder(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainTemplate>
      {loading && <Loader />}
      {orderData && (
        <OrderDetails
          order={orderData}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
          areAdminOptionsEnabled={user.role === 'admin'}
        />
      )}
    </MainTemplate>
  );
};
