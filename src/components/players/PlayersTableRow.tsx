import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Player, NewPlayer } from '../../types/players';
import TableRow from '../common/TableRow/TableRow';
import TableCell from '../common/TableCell/TableCell';
import useStyles from './styles';
import useAuthState from '../../context/auth/useAuthState';
import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import useModal from '../../hooks/useModal';

type TableRowProps = {
  player: Player;
  deletePlayer: (id: string) => void;
  handleSetCurrent: (player: NewPlayer) => void;
};

const PlayersTableRow = ({
  player,
  deletePlayer,
  handleSetCurrent,
}: TableRowProps) => {
  const classes = useStyles();
  const [isModalOpen, handleClickOpen, handleClose] = useModal();

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

  const playerEditData = {
    _id,
    firstName,
    lastName,
    club: club._id,
    position,
    dateOfBirth,
    height,
    weight,
    footed,
  };

  const { loading, user } = authContext;

  const formattedDate = new Intl.DateTimeFormat('pl-PL').format(
    new Date(dateOfBirth),
  );

  return (
    <TableRow>
      {loading && <Loader />}
      <TableCell>
        <Tooltip title="Edytuj">
          <IconButton
            aria-label="edit"
            onClick={() => handleSetCurrent(playerEditData)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Usuń">
          <div>
            <IconButton
              aria-label="delete"
              className={classes.delete}
              disabled={user?.role !== 'admin'}
              onClick={handleClickOpen}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Modal
              open={isModalOpen}
              message={`Usunąć zawodnika ${firstName} ${lastName} z bazy?`}
              handleAccept={() => deletePlayer(_id)}
              handleClose={handleClose}
            />
          </div>
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
