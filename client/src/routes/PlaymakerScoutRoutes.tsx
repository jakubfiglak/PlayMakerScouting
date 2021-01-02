import React from 'react';
import { Route } from 'react-router-dom';
import { OrdersPage } from '../pages/Orders/OrdersPage';
import { OrdersState } from '../context/orders/OrdersState';

export const PlaymakerScoutRoutes = () => {
  return (
    <>
      <OrdersState>
        <Route exact path="/orders" component={OrdersPage} />
      </OrdersState>
    </>
  );
};
