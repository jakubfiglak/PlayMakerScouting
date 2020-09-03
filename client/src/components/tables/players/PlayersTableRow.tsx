import React from 'react';
// MUI components
import { IconButton, Tooltip, Box } from '@material-ui/core';
// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell, Loader, Modal } from '../../common';
// Types
import { Player } from '../../../types/players';
// Hooks
import { useAuthState } from '../../../context';
import { useModal } from '../../../hooks';
// Utils & data
import { formatDate, getLabel } from '../../../utils';
import { footLabels, positionLabels } from '../../../data';
// Styles
import { useStyles } from '../styles';

type TableRowProps = {
  player: Player;
  deletePlayer: (id: string) => void;
  handleSetCurrent: (player: Player) => void;
};

export const PlayersTableRow = ({
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
    footed,
  } = player;

  const { loading, user } = authContext;

  return (
    <StyledTableRow>
      {loading && <Loader />}
      <StyledTableCell>
        <Box display="flex">
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
        </Box>
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{club.name}</StyledTableCell>
      <StyledTableCell>{getLabel(position, positionLabels)}</StyledTableCell>
      <StyledTableCell>{formatDate(dateOfBirth)}</StyledTableCell>
      <StyledTableCell>{getLabel(footed, footLabels)}</StyledTableCell>
    </StyledTableRow>
  );
};
