import React, { useEffect } from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { MatchSelect } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
import { Match } from '../../../types/matches';
// Hooks
import { usePlayersState } from '../../../context';
// Utils & data
import { formatDate } from '../../../utils';

type Props = {
  current: Report | null;
  matches: Match[];
};

export const MatchStep = ({ current, matches }: Props) => {
  if (current) {
    const {
      match: {
        homeTeam: { name: homeTeamName },
        awayTeam: { name: awayTeamName },
        date,
      },
    } = current;

    return (
      <Typography>
        {formatDate(date, true)}: {homeTeamName} vs. {awayTeamName}
      </Typography>
    );
  }

  return <MatchSelect matchesData={matches} name="match" />;
};
