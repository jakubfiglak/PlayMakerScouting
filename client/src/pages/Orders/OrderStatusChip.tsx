import clsx from 'clsx';
// MUI components
import { Chip, Avatar, makeStyles, Theme } from '@material-ui/core';
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
      avatar={
        <Avatar
          className={clsx({
            [classes.chip]: true,
            [classes.avatarOpen]: status === 'open',
            [classes.avatarClosed]: status === 'closed',
            [classes.avatarAccepted]: status === 'accepted',
          })}
        >
          {status[0].toUpperCase()}
        </Avatar>
      }
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
  avatarOpen: {
    background: theme.palette.success.main,
  },
  open: {
    background: theme.palette.success.light,
  },
  avatarAccepted: {
    background: theme.palette.secondary.main,
  },
  accepted: {
    background: theme.palette.secondary.light,
  },
  avatarClosed: {
    background: theme.palette.error.main,
  },
  closed: {
    background: theme.palette.error.light,
  },
}));
