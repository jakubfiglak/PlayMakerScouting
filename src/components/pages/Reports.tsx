import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import useAuthorization from '../../hooks/useAuthorization';

const Reports: React.FC = () => {
  useAuthorization();

  return (
    <MainTemplate>
      <h1>Reports</h1>
    </MainTemplate>
  );
};

export default Reports;
