import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { useAuthorization } from '../../hooks';

export const Orders = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Orders</h1>
    </MainTemplate>
  );
};
