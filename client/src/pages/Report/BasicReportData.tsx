import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Types
import { Report } from '../../types/reports';

type Props = Pick<
  Report,
  'minutesPlayed' | 'goals' | 'assists' | 'yellowCards' | 'redCards'
>;

export const BasicReportData = ({
  minutesPlayed,
  goals,
  assists,
  yellowCards,
  redCards,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="basic-data-content"
        id="basic-data-header"
      >
        <Typography>Dane podstawowe</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Minuty rozegrane: </strong>
              {minutesPlayed}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Bramki: </strong>
              {goals}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Asysty: </strong>
              {assists}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Żółte kartki: </strong>
              {yellowCards}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Czerwone kartki: </strong>
              {redCards}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
