import React, { useEffect } from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { OrderCard } from './OrderCard';
// Types
import { OrdersData, OrdersFilterData } from '../../types/orders';

type OrdersGridProps = {
  ordersData: OrdersData;
  filters: OrdersFilterData;
  getOrders: (filters: OrdersFilterData) => void;
  deleteOrder: (id: string) => void;
  acceptOrder: (id: string, filters: OrdersFilterData) => void;
};

export const OrdersGrid = ({
  ordersData,
  filters,
  getOrders,
  deleteOrder,
  acceptOrder,
}: OrdersGridProps) => {
  useEffect(() => {
    getOrders(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <Grid container spacing={2}>
      {ordersData.docs.map((order) => (
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
