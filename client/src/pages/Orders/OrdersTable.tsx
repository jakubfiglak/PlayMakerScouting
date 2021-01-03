import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// MUI components
import { Box, IconButton, Tooltip, Link } from '@material-ui/core';
// MUI icons
import {
  Search as SearchIcon,
  AssignmentLate as NoteIcon,
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
}: Props) => {
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
            <StyledTableCell>
              <Box display="flex">
                <Tooltip title="Zobacz szczegóły">
                  <Link component={RouterLink} to={`/orders/${_id}`}>
                    <IconButton aria-label="go to order">
                      <SearchIcon />
                    </IconButton>
                  </Link>
                </Tooltip>
              </Box>
            </StyledTableCell>
            <StyledTableCell>{`${player.firstName} ${player.lastName}`}</StyledTableCell>
            <StyledTableCell>
              <OrderStatusChip status={status} />
            </StyledTableCell>
            <StyledTableCell>
              {scout ? `${scout.firstName} ${scout.lastName}` : ''}
            </StyledTableCell>
            <StyledTableCell>{formatDate(createdAt, true)}</StyledTableCell>
            <StyledTableCell>{notes && <NoteIcon />}</StyledTableCell>
          </StyledTableRow>
        );
      })}
    </Table>
  );
};
