import React from 'react';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Player } from '../../types/players';
// Utils & data
import { getLabel } from '../../utils';
import { footLabels, positionLabels } from '../../data';

type TableRowProps = {
  player: Player;
  handleSetCurrent: (player: Player) => void;
};

export const PlayersTableRow = ({
  player,
  handleSetCurrent,
}: TableRowProps) => {
  const { firstName, lastName, club, position, yearOfBirth, footed } = player;

  return (
    <StyledTableRow>
      <StyledTableCell padding="checkbox">
        <Tooltip title="Edytuj">
          <IconButton
            aria-label="edit"
            onClick={() => handleSetCurrent(player)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{club.name}</StyledTableCell>
      <StyledTableCell>{getLabel(position, positionLabels)}</StyledTableCell>
      <StyledTableCell>{yearOfBirth}</StyledTableCell>
      <StyledTableCell>{getLabel(footed, footLabels)}</StyledTableCell>
    </StyledTableRow>
  );
};
