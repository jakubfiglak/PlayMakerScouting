import React from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { MatchSelect } from '../selects';
// Types
import { Report } from '../../../types/reports';
import { Match } from '../../../types/matches';
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

  if (matches.length === 0) {
    return (
      <Typography>
        Drużyna zawodnika, którego wybrałeś, nie ma żadnego meczu zdefiniowanego
        w bazie. Stwórz mecz w zakładce <strong>Mecze</strong> i wróć do
        tworzenia raportu
      </Typography>
    );
  }

  return <MatchSelect matchesData={matches} name="match" />;
};
