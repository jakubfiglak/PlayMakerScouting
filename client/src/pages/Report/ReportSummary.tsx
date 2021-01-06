import React from 'react';
import { Radar } from 'react-chartjs-2';
// MUI components
import { Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';
// Styles
import { yellow, yellowTransparent } from '../../theme/colors';

const options = {
  maintainAspectRatio: false,
  legend: { display: false },
  scale: {
    ticks: { beginAtZero: true, min: 0, max: 4, stepSize: 1 },
  },
  max: 1,
  stepSize: 1,
};

type Props = Pick<
  Report,
  | 'summary'
  | 'finalRating'
  | 'individualAvg'
  | 'teamplayAvg'
  | 'avgRating'
  | 'individualSkills'
  | 'teamplaySkills'
>;

export const ReportSummary = ({
  summary,
  finalRating,
  individualAvg,
  teamplayAvg,
  avgRating,
  individualSkills,
  teamplaySkills,
}: Props) => {
  const classes = useStyles();

  const skills = { ...individualSkills, ...teamplaySkills };

  const data = {
    labels: Object.keys(skills),
    datasets: [
      {
        data: Object.entries(skills).map(([_, value]) => value?.rating),
        backgroundColor: yellowTransparent,
        borderColor: yellow,
        borderWidth: 1,
      },
    ],
  };

  return (
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
        <Radar data={data} options={options} width={250} height={250} />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
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
