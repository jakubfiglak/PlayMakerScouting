import React from 'react';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell } from '../../common';
// Types
import { Club } from '../../../types/clubs';

type TableRowProps = {
  club: Club;
  handleSetCurrent: (club: Club) => void;
};

export const ClubsTableRow = ({ club, handleSetCurrent }: TableRowProps) => {
  const {
    name,
    division,
    address: { voivodeship },
  } = club;

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Tooltip title="Edytuj">
          <IconButton aria-label="edit" onClick={() => handleSetCurrent(club)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
