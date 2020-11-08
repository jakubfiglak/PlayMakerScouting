import React from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { MatchSelect } from '../selects';
// Types
import { Match } from '../../../types/matches';

type Props = {
  matches: Match[];
};

export const MatchStep = ({ matches }: Props) => {
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
