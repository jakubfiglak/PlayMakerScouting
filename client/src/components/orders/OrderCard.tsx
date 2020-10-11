import React from 'react';
import clsx from 'clsx';
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
  Chip,
  Avatar,
} from '@material-ui/core';
// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
// Custom components
import { Modal, Loader } from '../common';
// Types
import { Order, OrdersFilterData } from '../../types/orders';
// Hooks
import { useAuthState } from '../../context';
import { useModal } from '../../hooks';
// Utils & data
import { formatDate, getLabel } from '../../utils';
import { orderStatusLabels } from '../../data';
// Styles
import { useStyles } from './styles';

type OrderCardProps = {
  order: Order;
  filters: OrdersFilterData;
  deleteOrder: (id: string) => void;
  acceptOrder: (id: string, filters: OrdersFilterData) => void;
};

export const OrderCard = ({
  order,
  filters,
  deleteOrder,
  acceptOrder,
}: OrderCardProps) => {
  const classes = useStyles();

  const authContext = useAuthState();

  const { loading, user } = authContext;

  const [
    isDeleteModalOpen,
    handleClickOpenDelete,
    handleCloseDelete,
  ] = useModal();

  const {
    _id,
    docNumber,
    player,
    status,
    scout,
    createdAt,
    acceptDate,
    closeDate,
    notes,
  } = order;

  return (
    <Card>
      {loading && <Loader />}
      <CardContent>
        <CardHeader
          title="Zlecenie obserwacji"
          subheader={`Nr: ${docNumber}`}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Status:</strong>{' '}
              <Chip
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
                label={getLabel(status, orderStatusLabels)}
                className={clsx({
                  [classes.chip]: true,
                  [classes.open]: status === 'open',
                  [classes.closed]: status === 'closed',
                  [classes.accepted]: status === 'accepted',
                })}
              />
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
          <div>
            <Tooltip title="Usuń">
              <IconButton
                aria-label="delete match"
                className={classes.delete}
                disabled={user?.role !== 'admin'}
                onClick={handleClickOpenDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Modal
              open={isDeleteModalOpen}
              message={`Usunąć zlecenie ${_id} z bazy?`}
              handleAccept={() => deleteOrder(_id)}
              handleClose={handleCloseDelete}
            />
          </div>
          <Tooltip title="Przyjmij zlecenie">
            <IconButton
              aria-label="edit match"
              className={classes.accept}
              disabled={status !== 'open'}
              onClick={() => acceptOrder(_id, filters)}
            >
              <AssignmentTurnedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Raporty">
            <IconButton
              aria-label="reports"
              onClick={() => console.log('generate report')}
            >
              <AssignmentIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </CardActions>
    </Card>
  );
};
