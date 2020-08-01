import React, { useEffect } from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@material-ui/core';
// Custom components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ReportHeaderCard } from './ReportHeaderCard';
import { BasicReportData } from './BasicReportData';
import { IndividualSkillsData } from './IndividualSkillsData';
import { Loader } from '../common';
// MUI icons
// Hooks
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Raport z obserwacji nr {id}
          </Typography>
        </Grid>
        {current && (
          <>
            <Grid item xs={12}>
              <ReportHeaderCard report={current} />
            </Grid>
            <Grid item xs={12}>
              <BasicReportData report={current} />
              <IndividualSkillsData report={current} />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};
