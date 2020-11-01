import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { OrderCard } from './OrderCard';
// Types
import { OrdersData } from '../../types/orders';

type Props = {
  ordersData: OrdersData;
  deleteOrder: (id: string) => void;
  acceptOrder: (id: string) => void;
  closeOrder: (id: string) => void;
};

export const OrdersGrid = ({
  ordersData,
  deleteOrder,
  acceptOrder,
  closeOrder,
}: Props) => {
  return (
    <Grid container spacing={2}>
      {ordersData.docs.map((order) => (
        <Grid item xs={12} sm={6} md={3} key={order._id}>
          <OrderCard
            order={order}
            deleteOrder={deleteOrder}
            acceptOrder={acceptOrder}
            closeOrder={closeOrder}
          />
        </Grid>
      ))}
    </Grid>
  );
};
