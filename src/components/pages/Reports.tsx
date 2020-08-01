import React from 'react';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { ReportsContent } from '../content';
import { useAuthorization } from '../../hooks';
import { ReportsState } from '../../context';

export const Reports = () => {
  useAuthorization();

  return (
    <ReportsState>
      <MainTemplate>
        <ReportsContent />
      </MainTemplate>
    </ReportsState>
  );
};
