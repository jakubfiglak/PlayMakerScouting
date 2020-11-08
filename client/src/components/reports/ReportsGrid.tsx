import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { ReportCard } from './ReportCard';
// Types
import { Report } from '../../types/reports';

type ReportsGridProps = {
  reports: Report[];
  onEditClick: (report: Report) => void;
};

export const ReportsGrid = ({ reports, onEditClick }: ReportsGridProps) => {
  return (
    <Grid container spacing={2}>
      {reports.map((report) => (
        <Grid item xs={12} sm={6} md={3} key={report._id}>
          <ReportCard report={report} onEditClick={onEditClick} />
        </Grid>
      ))}
    </Grid>
  );
};
