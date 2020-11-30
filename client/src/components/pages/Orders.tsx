import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { OrdersContent } from '../content';
import { OrdersState } from '../../context';
import { useAuthorization } from '../../hooks';

export const Orders = () => {
  // useAuthorization();

  return (
    <OrdersState>
      <MainTemplate>
        <OrdersContent />
      </MainTemplate>
    </OrdersState>
  );
};
