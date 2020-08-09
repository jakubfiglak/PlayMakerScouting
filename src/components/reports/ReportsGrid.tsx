import React, { useEffect } from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { ReportCard } from './ReportCard';
// Types
import { Report } from '../../types/reports';

type ReportsGridProps = {
  reportsData: Report[];
  getReports: () => void;
  handleSetCurrent: (report: Report) => void;
};

export const ReportsGrid = ({
  reportsData,
  getReports,
  handleSetCurrent,
}: ReportsGridProps) => {
  useEffect(() => {
    getReports();
  }, []);

  return (
    <Grid container spacing={2}>
      {reportsData.map((report) => (
        <Grid item xs={12} sm={6} md={3} key={report._id}>
          <ReportCard report={report} handleSetCurrent={handleSetCurrent} />
        </Grid>
      ))}
    </Grid>
  );
};
