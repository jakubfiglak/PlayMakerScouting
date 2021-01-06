import React from 'react';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableCell } from '../../components/table/TableCell';
import { StyledTableRow } from '../../components/table/TableRow';
// Types
import { Club } from '../../types/clubs';

type Props = {
  club: Club;
  handleSetCurrent: (club: Club) => void;
};

export const ClubsTableRow = ({ club, handleSetCurrent }: Props) => {
  const { name, division, voivodeship } = club;

  return (
    <StyledTableRow>
      <StyledTableCell padding="checkbox">
        <Tooltip title="Edytuj">
          <IconButton aria-label="edit" onClick={() => handleSetCurrent(club)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
