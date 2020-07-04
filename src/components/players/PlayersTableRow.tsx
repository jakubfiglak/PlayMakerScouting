import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Player } from '../../types/players';
import TableRow from '../common/TableRow/TableRow';
import TableCell from '../common/TableCell/TableCell';
import useStyles from './styles';
import useAuthState from '../../context/auth/useAuthState';
import Loader from '../common/Loader/Loader';

type TableRowProps = {
  player: Player;
  deletePlayer: (id: string) => void;
};

const PlayersTableRow = ({ player, deletePlayer }: TableRowProps) => {
  const classes = useStyles();
  const authContext = useAuthState();
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

  const { loading, user } = authContext;

  const formattedDate = new Intl.DateTimeFormat('pl-PL').format(
    new Date(dateOfBirth),
  );

  return (
    <TableRow>
      {loading && <Loader />}
      <TableCell>
        <Tooltip title="Edytuj">
          <IconButton aria-label="edit">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Usuń">
          <IconButton
            aria-label="delete"
            className={classes.delete}
            disabled={user?.role !== 'admin'}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{club.name}</TableCell>
      <TableCell>{position}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>{height}</TableCell>
      <TableCell>{weight}</TableCell>
      <TableCell>{footed}</TableCell>
    </TableRow>
  );
};

export default PlayersTableRow;
