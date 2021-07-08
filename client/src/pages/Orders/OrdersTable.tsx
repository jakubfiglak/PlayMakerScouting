import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import {
  IconButton,
  Tooltip,
  Link,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import {
  Search as SearchIcon,
  AssignmentLate as NoteIcon,
  Lock as CloseIcon,
  CancelOutlined as RejectIcon,
  AssignmentTurnedIn as AcceptIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
// Custom components
import { OrderStatusChip } from './OrderStatusChip';
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Order } from '../../types/orders';
import { CommonTableProps } from '../../types/common';
// Utils & data
import { formatDate } from '../../utils/dates';

type Props = {
  orders: Order[];
  onAcceptOrderClick: (id: string) => void;
  onCloseOrderClick: (id: string) => void;
  onRejectOrderClick: (id: string) => void;
  onDeleteOrderClick: (id: string) => void;
  areAdminOptionsEnabled: boolean;
} & CommonTableProps;

const headCells = [
  { id: 'player', label: 'Zawodnik' },
  { id: 'status', label: 'Status' },
  { id: 'scout', label: 'Scout' },
  { id: 'createdAt', label: 'Data utworzenia' },
  { id: 'notes', label: 'Uwagi' },
];

export const OrdersTable = ({
  page,
  rowsPerPage,
  sortBy,
  order,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSort,
  total,
  orders,
  onAcceptOrderClick,
  onCloseOrderClick,
  onDeleteOrderClick,
  onRejectOrderClick,
  areAdminOptionsEnabled,
}: Props) => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  return (
    <Table
      page={page}
      rowsPerPage={rowsPerPage}
      sortBy={sortBy}
      order={order}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleSort={handleSort}
      total={total}
      headCells={headCells}
    >
      {orders.map((orderData) => {
        const { id, player, status, scout, createdAt, notes } = orderData;

        return (
          <StyledTableRow key={id}>
            <StyledTableCell padding="checkbox">
              <div className={classes.buttonsContainer}>
                <Tooltip title="Zobacz szczegóły">
                  <Link component={RouterLink} to={`/orders/${id}`}>
                    <IconButton aria-label="go to order">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Przyjmij zlecenie">
                  <IconButton
                    aria-label="accept order"
                    className={classes.accept}
                    disabled={status !== 'open'}
                    onClick={() => onAcceptOrderClick(id)}
                  >
                    <AcceptIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Odrzuć zlecenie">
                  <IconButton
                    aria-label="reject order"
                    className={classes.delete}
                    disabled={!(status === 'accepted' && scout?.id === user.id)}
                    onClick={() => onRejectOrderClick(id)}
                  >
                    <RejectIcon />
                  </IconButton>
                </Tooltip>
                {areAdminOptionsEnabled && (
                  <>
                    <Tooltip title="Zamknij zlecenie">
                      <IconButton
                        aria-label="close order"
                        className={classes.delete}
                        disabled={status !== 'accepted'}
                        onClick={() => onCloseOrderClick(id)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń zlecenie">
                      <IconButton
                        aria-label="delete order"
                        className={classes.delete}
                        disabled={status !== 'open'}
                        onClick={() => onDeleteOrderClick(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </div>
            </StyledTableCell>
            <StyledTableCell>{`${player.firstName} ${player.lastName}`}</StyledTableCell>
            <StyledTableCell>
              <OrderStatusChip status={status} />
            </StyledTableCell>
            <StyledTableCell>
              {scout ? `${scout.firstName} ${scout.lastName}` : ''}
            </StyledTableCell>
            <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
            <StyledTableCell padding="checkbox" align="center">
              {notes && (
                <Tooltip title={notes}>
                  <NoteIcon />
                </Tooltip>
              )}
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </Table>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  buttonsContainer: {
    display: 'flex',
  },
  delete: {
    color: theme.palette.error.light,
  },
  accept: {
    color: theme.palette.success.light,
  },
}));
