import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TablePagination,
  TableFooter,
  TableRow,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
} from '@material-ui/core';
import PlayersTableHead from './PlayersTableHead';
import PlayersTableRow from './PlayersTableRow';
import TablePaginationActions from '../common/TablePaginationActions/TablePaginationActions';
import Loader from '../common/Loader/Loader';
import usePlayersState from '../../context/players/usePlayersState';
import useStyles from './styles';

const PlayersTable: React.FC = () => {
  const classes = useStyles();
  const playersContext = usePlayersState();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [sort, setSort] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as string);
  };

  const { loading, getPlayers, playersData } = playersContext;

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sort);
    console.log(playersData);
  }, [page, rowsPerPage, sort]);

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
      {loading && <Loader />}
      <FormControl className={classes.formControl}>
        <Select
          value={sort}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="_id" />
          <MenuItem value="lastName">Nazwisko</MenuItem>
          <MenuItem value="position">Pozycja</MenuItem>
          <MenuItem value="dateOfBirth">Data urodzenia</MenuItem>
        </Select>
        <FormHelperText>Sortuj według</FormHelperText>
      </FormControl>
      <Table className={classes.table} aria-label="customized table">
        <PlayersTableHead />
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
