import React from 'react';
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
import { FinalRatingChip } from './FinalRatingChip';
// MUI icons

type ReportSummaryAccordionProps = {
  summary: string;
  finalRating: 1 | 2 | 3 | 4;
  individualAvg: number;
  teamplayAvg: number;
  avgRating: number;
};

export const ReportSummaryAccordion = ({
  summary,
  finalRating,
  individualAvg,
  teamplayAvg,
  avgRating,
}: ReportSummaryAccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="report-summary-content"
        id="report-summary-header"
      >
        <Typography>Podsumowanie</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Podsumowanie występu</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {summary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FinalRatingChip finalRating={finalRating} />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Średnia ocena umiejętności indywidualnych: </strong>
              {individualAvg.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Średnia ocena współdziałania z partnerami: </strong>
              {teamplayAvg.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Średnia ocena: </strong>
              {avgRating.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
