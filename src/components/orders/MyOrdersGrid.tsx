import React, { useEffect } from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { OrderCard } from './OrderCard';
// Types
import { Order } from '../../types/orders';

type OrdersGridProps = {
  myOrdersData: Order[];
  getMyOrders: () => void;
  deleteOrder: (id: string) => void;
  acceptOrder: (id: string) => void;
};

export const MyOrdersGrid = ({
  myOrdersData,
  getMyOrders,
  deleteOrder,
  acceptOrder,
}: OrdersGridProps) => {
  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Grid container spacing={2}>
      {myOrdersData.map((order) => (
        <Grid item xs={12} sm={6} md={3} key={order._id}>
          <OrderCard
            order={order}
            deleteOrder={deleteOrder}
            acceptOrder={acceptOrder}
          />
        </Grid>
      ))}
    </Grid>
  );
};
