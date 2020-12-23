import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { OrdersContent } from '../components/content';
import { OrdersState } from '../context';

export const Orders = () => {
  return (
    <OrdersState>
      <MainTemplate>
        <OrdersContent />
      </MainTemplate>
    </OrdersState>
  );
};
