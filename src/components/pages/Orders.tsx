import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Orders: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Orders</h1>
    </MainTemplate>
  );
};

export default Orders;
