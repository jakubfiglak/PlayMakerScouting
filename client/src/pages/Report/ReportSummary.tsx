import { Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { FinalRatingChip } from '../Reports/FinalRatingChip';
// Types
import { Report } from '../../types/reports';
// Styles
import { SkillsChart } from './SkillsChart';

type Props = Pick<
  Report,
  | 'summary'
  | 'finalRating'
  | 'avgRating'
  | 'skills'
  | 'maxRatingScore'
  | 'percentageRating'
>;

export const ReportSummary = ({
  summary,
  finalRating,
  avgRating,
  skills,
  maxRatingScore,
  percentageRating,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.textContainer}>
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
          <strong>Średnia ocena: </strong>
          {`${avgRating.toFixed(2)} (${percentageRating.toFixed(1)}%)`}
        </Typography>
      </div>
      <div>
        <SkillsChart
          skills={skills.filter((skill) => skill.score)}
          width={250}
          height={250}
          maxRatingScore={maxRatingScore}
        />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
    marginBottom: theme.spacing(2),
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
}));
