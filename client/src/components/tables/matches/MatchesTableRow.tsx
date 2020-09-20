import React from 'react';
// MUI components
import { IconButton, Tooltip } from '@material-ui/core';
// MUI icons
import EditIcon from '@material-ui/icons/Edit';
// Custom components
import { StyledTableRow, StyledTableCell } from '../../common';
// Types
import { Match } from '../../../types/matches';
// Utils & data
import { formatDate, getLabel } from '../../../utils';
import { competitionLabels } from '../../../data';

type TableRowProps = {
  match: Match;
  handleSetCurrent: (match: Match) => void;
};

export const MatchesTableRow = ({ match, handleSetCurrent }: TableRowProps) => {
  const { homeTeam, awayTeam, date, competition } = match;

  return (
    <StyledTableRow>
      <StyledTableCell>
        <Tooltip title="Edytuj">
          <IconButton aria-label="edit" onClick={() => handleSetCurrent(match)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell>{formatDate(date)}</StyledTableCell>
      <StyledTableCell>{homeTeam.name}</StyledTableCell>
      <StyledTableCell>{awayTeam.name}</StyledTableCell>
      <StyledTableCell>
        {getLabel(competition, competitionLabels)}
      </StyledTableCell>
    </StyledTableRow>
  );
};
