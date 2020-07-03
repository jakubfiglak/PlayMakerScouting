import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableRow,
} from '@material-ui/core';
import PlayersTableRow from './PlayersTableRow';
import TablePaginationActions from '../common/TablePaginationActions/TablePaginationActions';
import Loader from '../common/Loader/Loader';
import usePlayersState from '../../context/players/usePlayersState';
import useStyles from './styles';
import headCells from './data';
import TableHeader from '../common/TableHeader/TableHeader';
import { Order } from '../../types/common';

const PlayersTable: React.FC = () => {
  const classes = useStyles();
  const playersContext = usePlayersState();

  const { loading, getPlayers, playersData } = playersContext;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('_id');
  const [order, setOrder] = useState<Order>('asc');

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order);
    console.log(playersData);
  }, [page, rowsPerPage, sortBy, order]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (id: string) => {
    const isAsc = sortBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSortBy(id);
  };

  return (
    <TableContainer component={Paper} className={classes.paper}>
      {loading && <Loader />}
      <Table className={classes.table} aria-label="customized table">
        <TableHeader
          headCells={headCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {playersData.data.map((player) => {
            const {
              _id,
              firstName,
              lastName,
              club,
              position,
              dateOfBirth,
              height,
              weight,
              footed,
            } = player;

            return (
              <PlayersTableRow
                key={_id}
                _id={_id}
                firstName={firstName}
                lastName={lastName}
                club={club}
                position={position}
                dateOfBirth={dateOfBirth}
                height={height}
                weight={weight}
                footed={footed}
              />
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={8}
              count={playersData.total}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default PlayersTable;
