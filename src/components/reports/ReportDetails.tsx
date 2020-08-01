import React, { useEffect } from 'react';
import { useReportsState } from '../../context';

type ReportDetailsProps = {
  id: string;
};

export const ReportDetails = ({ id }: ReportDetailsProps) => {
  const reportsContext = useReportsState();

  const { getReport, current, loading } = reportsContext;

  useEffect(() => {
    getReport(id);
  }, []);

  console.log(current);

  return (
    <p>
      This is report no.
      {id}
    </p>
  );
};
