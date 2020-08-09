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
import { formatDate } from '../../utils';
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

  const { _id, player, open, scout, createdAt, acceptDate } = order;

  return (
    <Card>
      {loading && <Loader />}
      <CardContent>
        <CardHeader title="Zlecenie obserwacji" subheader={`Nr: ${_id}`} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{`Zawodnik: ${player.firstName} ${player.lastName}`}</Typography>
          </Grid>
          {scout && (
            <Grid item xs={12}>
              <Typography>{`Scout: ${scout.name} ${scout.surname}`}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography>
              {`Data utworzenia: ${formatDate(createdAt, true)}`}
            </Typography>
          </Grid>
          {acceptDate && (
            <Grid item xs={12}>
              <Typography>
                {`Data przyjęcia: ${formatDate(acceptDate, true)}`}
              </Typography>
            </Grid>
          )}
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
              disabled={!open}
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
