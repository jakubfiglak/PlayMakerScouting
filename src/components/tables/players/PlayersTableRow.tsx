import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Player } from '../../../types/players';
import StyledTableRow from '../../common/Table/TableRow';
import StyledTableCell from '../../common/Table/TableCell';
import useStyles from '../styles';
import useAuthState from '../../../context/auth/useAuthState';
import Loader from '../../common/Loader/Loader';
import Modal from '../../common/Modal/Modal';
import useModal from '../../../hooks/useModal';

type TableRowProps = {
  player: Player;
  deletePlayer: (id: string) => void;
  handleSetCurrent: (player: Player) => void;
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

  const { loading, user } = authContext;

  const formattedDate = new Intl.DateTimeFormat('pl-PL').format(
    new Date(dateOfBirth),
  );

  return (
    <StyledTableRow>
      {loading && <Loader />}
      <StyledTableCell>
        <Tooltip title="Edytuj">
          <IconButton
            aria-label="edit"
            onClick={() => handleSetCurrent(player)}
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
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{club.name}</StyledTableCell>
      <StyledTableCell>{position}</StyledTableCell>
      <StyledTableCell>{formattedDate}</StyledTableCell>
      <StyledTableCell>{height}</StyledTableCell>
      <StyledTableCell>{weight}</StyledTableCell>
      <StyledTableCell>{footed}</StyledTableCell>
    </StyledTableRow>
  );
};

export default PlayersTableRow;
