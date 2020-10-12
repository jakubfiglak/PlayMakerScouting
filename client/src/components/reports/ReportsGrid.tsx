import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { ReportCard } from './ReportCard';
// Types
import { Report, ReportsData } from '../../types/reports';

type ReportsGridProps = {
  reportsData: ReportsData;
  handleSetCurrent: (report: Report) => void;
};

export const ReportsGrid = ({
  reportsData,
  handleSetCurrent,
}: ReportsGridProps) => {
  return (
    <Grid container spacing={2}>
      {reportsData.docs.map((report) => (
        <Grid item xs={12} sm={6} md={3} key={report._id}>
          <ReportCard report={report} handleSetCurrent={handleSetCurrent} />
        </Grid>
      ))}
    </Grid>
  );
};
