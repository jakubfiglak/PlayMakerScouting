import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from '@material-ui/core';
import TableCell from '../common/TableCell/TableCell';
import TableRow from '../common/TableRow/TableRow';
import usePlayersState from '../../context/players/usePlayersState';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  paper: {
    maxWidth: '90vw',
    overflowX: 'auto',
    margin: '0 auto',
  },
});

const PlayersTable: React.FC = () => {
  const classes = useStyles();
  const playersContext = usePlayersState();

  const { loading, getPlayers, players } = playersContext;

  useEffect(() => {
    getPlayers();
    console.log(players);
  }, []);

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwisko i Imię</TableCell>
            <TableCell>Klub</TableCell>
            <TableCell>Pozycja</TableCell>
            <TableCell>Data urodzenia</TableCell>
            <TableCell>Wzrost [cm]</TableCell>
            <TableCell>Waga [kg]</TableCell>
            <TableCell>Preferowana noga</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players &&
            players.map((player) => {
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

              const formattedDate = new Intl.DateTimeFormat('pl-PL').format(
                new Date(dateOfBirth),
              );

              return (
                <TableRow key={_id}>
                  <TableCell component="th" scope="row">
                    {`${lastName} ${firstName}`}
                  </TableCell>
                  <TableCell>{club.name}</TableCell>
                  <TableCell>{position}</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{height}</TableCell>
                  <TableCell>{weight}</TableCell>
                  <TableCell>{footed}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayersTable;
