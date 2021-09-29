import clsx from 'clsx';
// MUI components
import { Chip, makeStyles, Theme } from '@material-ui/core';
// Types
import { OrderStatus } from '../../types/orders';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  status: OrderStatus;
};

export const OrderStatusChip = ({ status }: Props) => {
  const classes = useStyles();

  return (
    <Chip
      size="small"
      label={getLabel(status)}
      className={clsx({
        [classes.chip]: true,
        [classes.open]: status === 'open',
        [classes.closed]: status === 'closed',
        [classes.accepted]: status === 'accepted',
      })}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    fontWeight: theme.typography.fontWeightBold,
  },
  open: {
    background: theme.palette.success.light,
  },
  accepted: {
    background: theme.palette.info.light,
  },
  closed: {
    background: theme.palette.error.light,
  },
}));
