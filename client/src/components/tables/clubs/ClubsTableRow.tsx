import React from 'react';
// MUI components
import { IconButton, Tooltip, Box } from '@material-ui/core';
// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell, Modal, Loader } from '../../common';
// Types
import { Club } from '../../../types/clubs';
// Hooks
import { useAuthState } from '../../../context';
import { useModal } from '../../../hooks';
// Styles
import { useStyles } from '../styles';

type TableRowProps = {
  club: Club;
  deleteClub: (id: string) => void;
  handleSetCurrent: (club: Club) => void;
};

export const ClubsTableRow = ({
  club,
  deleteClub,
  handleSetCurrent,
}: TableRowProps) => {
  const classes = useStyles();
  const [isModalOpen, handleClickOpen, handleClose] = useModal();

  const authContext = useAuthState();
  const {
    _id,
    name,
    division,
    address: { voivodeship },
  } = club;

  const { loading, user } = authContext;

  return (
    <StyledTableRow>
      {loading && <Loader />}
      <StyledTableCell>
        <Box display="flex">
          <Tooltip title="Edytuj">
            <IconButton
              aria-label="edit"
              onClick={() => handleSetCurrent(club)}
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
                message={`Usunąć klub ${name} z bazy?`}
                handleAccept={() => deleteClub(_id)}
                handleClose={handleClose}
              />
            </div>
          </Tooltip>
        </Box>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
