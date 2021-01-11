import React from 'react';
import { Route } from 'react-router-dom';
import { OrdersPage } from '../pages/Orders/OrdersPage';
import { OrderPage } from '../pages/Order/OrderPage';

export const PlaymakerScoutRoutes = () => {
  return (
    <>
      <Route exact path="/orders" component={OrdersPage} />
      <Route exact path="/orders/:id" component={OrderPage} />
    </>
  );
};
