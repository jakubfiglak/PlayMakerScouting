import clsx from 'clsx';
// MUI components
import { Chip, makeStyles, Theme } from '@material-ui/core';
// Types
import { RatingScore } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  finalRating: RatingScore;
  printeable?: boolean;
};

export const FinalRatingChip = ({ finalRating, printeable }: Props) => {
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={getLabel(finalRating)}
      classes={{
        root: clsx({
          [classes.chip]: true,
          [classes.negative]: finalRating === 1,
          [classes.unknown]: finalRating === 2,
          [classes.observe]: finalRating === 3,
          [classes.positive]: finalRating === 4,
        }),
        label: clsx({ [classes.label]: printeable }),
      }}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    fontWeight: theme.typography.fontWeightBold,
  },
  negative: {
    background: theme.palette.error.light,
  },
  unknown: {
    background: theme.palette.primary.light,
    color: theme.palette.background.default,
  },
  observe: {
    background: theme.palette.info.light,
  },
  positive: {
    background: theme.palette.success.light,
  },
  label: {
    fontSize: 10,
  },
}));
