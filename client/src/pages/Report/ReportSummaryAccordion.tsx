import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';

type Props = Pick<
  Report,
  'summary' | 'finalRating' | 'individualAvg' | 'teamplayAvg' | 'avgRating'
>;

export const ReportSummaryAccordion = ({
  summary,
  finalRating,
  individualAvg,
  teamplayAvg,
  avgRating,
}: Props) => {
  const classes = useStyles();

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
            <div className={classes.container}>
              <Typography>
                <strong>Ocena ostateczna: </strong>
              </Typography>
              <FinalRatingChip finalRating={finalRating} />
            </div>
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

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
}));
