import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Club } from '../../../types/clubs';
import StyledTableRow from '../../common/Table/TableRow';
import StyledTableCell from '../../common/Table/TableCell';
import useStyles from '../styles';
import useAuthState from '../../../context/auth/useAuthState';
import Loader from '../../common/Loader/Loader';
import Modal from '../../common/Modal/Modal';
import useModal from '../../../hooks/useModal';

type TableRowProps = {
  club: Club;
  deleteClub: (id: string) => void;
  handleSetCurrent: (club: Club) => void;
};

const PlayersTableRow = ({
  club,
  deleteClub,
  handleSetCurrent,
}: TableRowProps) => {
  const classes = useStyles();
  const [isModalOpen, handleClickOpen, handleClose] = useModal();

  const authContext = useAuthState();
  const { _id, name, division, location } = club;

  const { voivodeship } = location;

  const { loading, user } = authContext;

  return (
    <StyledTableRow>
      {loading && <Loader />}
      <StyledTableCell>
        <Tooltip title="Edytuj">
          <IconButton aria-label="edit" onClick={() => handleSetCurrent(club)}>
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
              message={`Usunąć klub ${name} z bazy?`}
              handleAccept={() => deleteClub(_id)}
              handleClose={handleClose}
            />
          </div>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};

export default PlayersTableRow;
