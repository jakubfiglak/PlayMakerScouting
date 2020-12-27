import React from 'react';
// MUI components
import { FormControl, Typography } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../../components/selects/PlayersCombo';
// Types
import { PlayerData } from '../../../types/simplifiedData';

type Props = {
  playersData: PlayerData[];
};

export const PlayerStep = ({ playersData }: Props) => {
  if (playersData.length === 0) {
    return (
      <Typography>
        Nie masz dostępu do żadnego zawodnika w bazie. Przyjmij do realizacji
        jedno z otwartych zleceń lub stwórz zawodnika w zakładce{' '}
        <strong>Zawodnicy</strong>
      </Typography>
    );
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <PlayersCombo label="Zawodnik" playersData={playersData} />
    </FormControl>
  );
};
