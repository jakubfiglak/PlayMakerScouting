import React from 'react';
// Custom components
import { StyledTableRow, StyledTableCell } from '../../common';
// Types
import { Match } from '../../../types/matches';
// Utils & data
import { formatDate, getLabel } from '../../../utils';
import { competitionLabels } from '../../../data';

type TableRowProps = {
  match: Match;
};

export const MatchesTableRow = ({ match }: TableRowProps) => {
  const { homeTeam, awayTeam, date, competition } = match;

  return (
    <StyledTableRow>
      <StyledTableCell>{formatDate(date)}</StyledTableCell>
      <StyledTableCell>{homeTeam.name}</StyledTableCell>
      <StyledTableCell>{awayTeam.name}</StyledTableCell>
      <StyledTableCell>
        {getLabel(competition, competitionLabels)}
      </StyledTableCell>
    </StyledTableRow>
  );
};
