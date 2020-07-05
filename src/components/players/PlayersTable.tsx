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
import useStyles from './styles';
import headCells from './data';
import TableHeader from '../common/TableHeader/TableHeader';
import useTable from '../../hooks/useTable';
import {
  PlayersData,
  GetPlayers,
  PlayersFilterData,
  NewPlayer,
} from '../../types/players';

type TableProps = {
  getPlayers: GetPlayers;
  playersData: PlayersData;
  filters: PlayersFilterData;
  deletePlayer: (id: string) => void;
  handleSetCurrent: (player: NewPlayer) => void;
};

const PlayersTable = ({
  getPlayers,
  playersData,
  filters,
  deletePlayer,
  handleSetCurrent,
}: TableProps) => {
  const classes = useStyles();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHeader
          headCells={headCells}
          sortBy={sortBy}
          order={order}
          handleSort={handleSort}
        />
        <TableBody>
          {playersData.data.map((player) => {
            const { _id } = player;

            return (
              <PlayersTableRow
                key={_id}
                player={player}
                deletePlayer={deletePlayer}
                handleSetCurrent={handleSetCurrent}
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
