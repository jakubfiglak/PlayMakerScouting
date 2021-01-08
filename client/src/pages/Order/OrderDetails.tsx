import React from 'react';
// MUI components
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Grid,
  Tooltip,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
// Custom components
import { OrderStatusChip } from '../Orders/OrderStatusChip';
// Types
import { Order } from '../../types/orders';
// Utils & data
import { formatDate } from '../../utils';

type Props = {
  order: Order;
  acceptOrder: (id: string) => void;
  closeOrder: (id: string) => void;
  areAdminOptionsEnabled: boolean;
};

export const OrderDetails = ({
  order,
  acceptOrder,
  closeOrder,
  areAdminOptionsEnabled,
}: Props) => {
  const classes = useStyles();

  const {
    _id,
    player,
    status,
    scout,
    createdAt,
    acceptDate,
    closeDate,
    notes,
  } = order;

  return (
    <Card className={classes.container}>
      <CardContent>
        <CardHeader title="Zlecenie obserwacji" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Status:</strong> <OrderStatusChip status={status} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Zawodnik:</strong> {player.firstName} {player.lastName}
            </Typography>
          </Grid>
          {scout && (
            <Grid item xs={12}>
              <Typography>
                <strong>Scout:</strong> {scout.firstName} {scout.lastName}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography>
              <strong>Data utworzenia:</strong> {formatDate(createdAt, true)}
            </Typography>
          </Grid>
          {acceptDate && (
            <Grid item xs={12}>
              <Typography>
                <strong>Data przyjęcia:</strong> {formatDate(acceptDate, true)}
              </Typography>
            </Grid>
          )}
          {closeDate && (
            <Grid item xs={12}>
              <Typography>
                <strong>Data zamknięcia:</strong> {formatDate(closeDate, true)}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography>
              <strong>Uwagi:</strong> {notes}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="center">
          <Tooltip title="Zamknij">
            <IconButton
              aria-label="close order"
              className={classes.delete}
              disabled={!areAdminOptionsEnabled || status === 'closed'}
              onClick={() => closeOrder(_id)}
            >
              <CancelOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Przyjmij zlecenie">
            <IconButton
              aria-label="edit match"
              className={classes.accept}
              disabled={status !== 'open'}
              onClick={() => acceptOrder(_id)}
            >
              <AssignmentTurnedInIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    maxWidth: 500,
    textAlign: 'center',
  },
  delete: {
    color: theme.palette.error.light,
  },
  accept: {
    color: theme.palette.success.light,
  },
}));