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
  CancelOutlined as CloseIcon,
  AssignmentTurnedIn as AcceptIcon,
} from '@material-ui/icons';
// Custom components
import { OrderStatusChip } from './OrderStatusChip';
import { Table } from '../../components/table/Table';
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Order } from '../../types/orders';
import { CommonTableProps } from '../../types/common';
// Utils & data
import { formatDate } from '../../utils/formatDate';

type Props = {
  orders: Order[];
  onAcceptOrderClick: (id: string) => void;
  onCloseOrderClick: (id: string) => void;
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
  areAdminOptionsEnabled,
}: Props) => {
  const classes = useStyles();

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
        const { _id, player, status, scout, createdAt, notes } = orderData;

        return (
          <StyledTableRow key={_id}>
            <StyledTableCell padding="checkbox">
              <div className={classes.buttonsContainer}>
                <Tooltip title="Zobacz szczegóły">
                  <Link component={RouterLink} to={`/orders/${_id}`}>
                    <IconButton aria-label="go to order">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Przyjmij zlecenie">
                  <IconButton
                    aria-label="edit match"
                    className={classes.accept}
                    disabled={status !== 'open'}
                    onClick={() => onAcceptOrderClick(_id)}
                  >
                    <AcceptIcon />
                  </IconButton>
                </Tooltip>
                {areAdminOptionsEnabled && (
                  <Tooltip title="Zamknij zlecenie">
                    <IconButton
                      aria-label="close order"
                      className={classes.delete}
                      disabled={status === 'closed'}
                      onClick={() => onCloseOrderClick(_id)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
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
              {notes && <NoteIcon />}
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
