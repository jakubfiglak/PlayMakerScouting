import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  TablePagination,
  TableFooter,
  TableRow,
} from '@material-ui/core';
import PlayersTableHead from './PlayersTableHead';
import PlayersTableRow from './PlayersTableRow';
import TablePaginationActions from '../common/TablePaginationActions/TablePaginationActions';
import usePlayersState from '../../context/players/usePlayersState';
import useStyles from './styles';

const PlayersTable: React.FC = () => {
  const classes = useStyles();
  const playersContext = usePlayersState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { loading, getPlayers, playersData } = playersContext;

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage);
    console.log(playersData);
  }, [page, rowsPerPage]);

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

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <PlayersTableHead />
        <TableBody>
          {loading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            playersData.data.map((player) => {
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
            })
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={7}
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
