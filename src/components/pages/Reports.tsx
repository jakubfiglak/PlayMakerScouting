import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { useAuthorization } from '../../hooks';

export const Reports = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Reports</h1>
    </MainTemplate>
  );
};
