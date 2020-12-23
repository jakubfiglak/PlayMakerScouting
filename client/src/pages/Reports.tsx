import React from 'react';
import MainTemplate from '../templates/MainTemplate';
import { ReportsContent } from '../components/content';
import { ReportsState, OrdersState, PlayersState } from '../context';

export const Reports = () => {
  return (
    <ReportsState>
      <OrdersState>
        <PlayersState>
          <MainTemplate>
            <ReportsContent />
          </MainTemplate>
        </PlayersState>
      </OrdersState>
    </ReportsState>
  );
};
