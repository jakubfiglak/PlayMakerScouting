import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { ReportsState } from '../../context';
import { useAuthorization } from '../../hooks';
import { ReportDetails } from '../reports';

type ParamTypes = {
  id: string;
};

export const Report = () => {
  useAuthorization();
  const params = useParams<ParamTypes>();

  const { id } = params;

  return (
    <ReportsState>
      <MainTemplate>
        <ReportDetails id={id} />
      </MainTemplate>
    </ReportsState>
  );
};
