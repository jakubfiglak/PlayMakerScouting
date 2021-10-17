import clsx from 'clsx';
// MUI components
import { Chip, makeStyles, Theme } from '@material-ui/core';
// Types
import { ReportStatus } from '../../types/reports';

type Props = {
  status: ReportStatus;
};

export const StatusChip = ({ status }: Props) => {
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={status === 'in-prep' ? 'W opracowaniu' : 'Ukończony'}
      classes={{
        root: clsx({
          [classes.chip]: true,
          [classes.prep]: status === 'in-prep',
          [classes.finished]: status === 'closed',
        }),
      }}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    fontWeight: theme.typography.fontWeightBold,
  },
  prep: {
    background: theme.palette.info.light,
  },
  finished: {
    background: theme.palette.success.light,
  },
}));
