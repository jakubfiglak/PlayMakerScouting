import React from 'react';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell, Loader } from '../../common';
// Types
import { Player } from '../../../types/players';
// Hooks
import { useAuthState } from '../../../context';
// Utils & data
import { formatDate, getLabel } from '../../../utils';
import { footLabels, positionLabels } from '../../../data';

type TableRowProps = {
  player: Player;
  handleSetCurrent: (player: Player) => void;
};

export const PlayersTableRow = ({
  player,
  handleSetCurrent,
}: TableRowProps) => {
  const authContext = useAuthState();
  const { firstName, lastName, club, position, dateOfBirth, footed } = player;

  const { loading } = authContext;

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
