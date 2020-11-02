import React, { useEffect } from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { MatchSelect } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
// Hooks
import { usePlayersState } from '../../../context';
// Utils & data
import { formatDate } from '../../../utils';

type Props = {
  player: string;
  current: Report | null;
};

export const MatchStep = ({ player, current }: Props) => {
  const playersContext = usePlayersState();

  const { loading, getPlayerMatches, playerMatches } = playersContext;

  useEffect(() => {
    if (!current) {
      getPlayerMatches(player);
    }
  }, []);

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

  return (
    <>
      {loading && <Loader />}
      <MatchSelect matchesData={playerMatches} name="match" />
    </>
  );
};
