import React, { useEffect } from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { OrdersSelect } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
// Hooks
import { useOrdersState } from '../../../context';

type Props = {
  current: Report | null;
};

export const OrderStep = ({ current }: Props) => {
  const ordersContext = useOrdersState();

  const { loading, getMyOrders, myOrdersData } = ordersContext;

  useEffect(() => {
    if (!current) {
      getMyOrders();
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {current ? (
        <Typography>
          {current.order
            ? `Zlecenie obserwacji nr ${current.order}`
            : 'Raport bez przypisanego zlecenia obserwacji'}
        </Typography>
      ) : (
        <OrdersSelect ordersData={myOrdersData.docs} name="order" />
      )}
    </>
  );
};
