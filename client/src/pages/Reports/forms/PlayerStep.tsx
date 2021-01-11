import React from 'react';
// MUI components
import { FormControl } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../../components/selects/PlayersCombo';
// Types
import { PlayerBasicInfo } from '../../../types/players';

type Props = {
  playersData: PlayerBasicInfo[];
  onAddPlayerClick: () => void;
};

export const PlayerStep = ({ playersData, onAddPlayerClick }: Props) => {
  return (
    <FormControl variant="outlined" fullWidth>
      <PlayersCombo
        label="Zawodnik"
        playersData={playersData}
        addPlayerOption
        onAddPlayerClick={onAddPlayerClick}
      />
    </FormControl>
  );
};
