import React from 'react';
import { Route } from 'react-router-dom';
import { OrdersPage } from '../pages/Orders/OrdersPage';
import { OrderPage } from '../pages/Order/OrderPage';
import { OrdersState } from '../context/orders/OrdersState';

export const PlaymakerScoutRoutes = () => {
  return (
    <>
      <OrdersState>
        <Route exact path="/orders" component={OrdersPage} />
        <Route exact path="/orders/:id" component={OrderPage} />
      </OrdersState>
    </>
  );
};
