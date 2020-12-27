import React from 'react';
import { useParams } from 'react-router-dom';
import { MainTemplate } from '../../templates/MainTemplate';
import { ReportDetails } from '../../components/reports';

type ParamTypes = {
  id: string;
};

export const ReportPage = () => {
  const params = useParams<ParamTypes>();

  const { id } = params;

  return (
    <MainTemplate>
      <ReportDetails id={id} />
    </MainTemplate>
  );
};
