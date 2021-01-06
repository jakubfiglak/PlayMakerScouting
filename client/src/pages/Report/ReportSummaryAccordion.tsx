import React from 'react';
import { Radar } from 'react-chartjs-2';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';

const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scale: {
    ticks: { beginAtZero: true },
  },
};

type Props = Pick<
  Report,
  'summary' | 'finalRating' | 'individualAvg' | 'teamplayAvg' | 'avgRating'
> & {
  chartData: {
    labels: string[];
    data: number[];
  };
};

export const ReportSummaryAccordion = ({
  summary,
  finalRating,
  individualAvg,
  teamplayAvg,
  avgRating,
  chartData,
}: Props) => {
  const classes = useStyles();

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data || [2, 2, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  console.log({ chartData });
  console.log({ data });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="report-summary-content"
        id="report-summary-header"
      >
        <Typography>Podsumowanie</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <div className={classes.container}>
          <div className={classes.propsContainer}>
            <Typography>
              <strong>Podsumowanie występu</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {summary}
            </Typography>
            <div className={classes.ratingContainer}>
              <Typography>
                <strong>Ocena ostateczna: </strong>
              </Typography>
              <FinalRatingChip finalRating={finalRating} />
            </div>
            <Typography>
              <strong>Średnia ocena umiejętności indywidualnych: </strong>
              {individualAvg.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Średnia ocena współdziałania z partnerami: </strong>
              {teamplayAvg.toFixed(2)}
            </Typography>
            <Typography>
              <strong>Średnia ocena: </strong>
              {avgRating.toFixed(2)}
            </Typography>
          </div>
          <div>
            {data.datasets[0].data.length > 0 && (
              <Radar data={data} options={options} width={250} height={250} />
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  accordionDetails: {
    flexDirection: 'column',
  },
  propsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
  container: {
    display: 'flex',
    gap: `${theme.spacing(6)}px`,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
}));
