import React, { useEffect } from 'react';
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
import useTable from '../../hooks/useTable';

const PlayersTable: React.FC = () => {
  const classes = useStyles();
  const playersContext = usePlayersState();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  const { loading, getPlayers, playersData } = playersContext;

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order]);

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
