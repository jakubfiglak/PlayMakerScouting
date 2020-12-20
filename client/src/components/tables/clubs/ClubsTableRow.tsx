import React from 'react';
// MUI components
import { IconButton, Tooltip, Box } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell } from '../../common';
// Types
import { Club } from '../../../types/clubs';

type Props = {
  club: Club;
  handleSetCurrent: (club: Club) => void;
};

export const ClubsTableRow = ({ club, handleSetCurrent }: Props) => {
  const { name, division, voivodeship } = club;

  return (
    <StyledTableRow>
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
        </Box>
      </StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{division}</StyledTableCell>
      <StyledTableCell>{voivodeship}</StyledTableCell>
    </StyledTableRow>
  );
};
