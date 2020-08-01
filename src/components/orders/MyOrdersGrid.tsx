import React, { useEffect } from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { OrderCard } from './OrderCard';
// Types
import { Order, OrdersFilterData } from '../../types/orders';

type OrdersGridProps = {
  myOrdersData: Order[];
  filters: OrdersFilterData;
  getMyOrders: () => void;
  deleteOrder: (id: string) => void;
  acceptOrder: (id: string, filters: OrdersFilterData) => void;
};

export const MyOrdersGrid = ({
  myOrdersData,
  filters,
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
            filters={filters}
            deleteOrder={deleteOrder}
            acceptOrder={acceptOrder}
          />
        </Grid>
      ))}
    </Grid>
  );
};
