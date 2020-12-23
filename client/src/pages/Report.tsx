import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import { ReportsState } from '../context';
import { ReportDetails } from '../components/reports';

type ParamTypes = {
  id: string;
};

export const Report = () => {
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
