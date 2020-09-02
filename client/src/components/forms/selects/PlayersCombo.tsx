import React, { Dispatch, SetStateAction } from 'react';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { PlayerData } from '../../../types/simplifiedData';

type PlayersComboProps = {
  playersData: PlayerData[];
  setFormData: Dispatch<SetStateAction<any>>;
  value: string;
  id: string;
  label: string;
  size?: 'medium' | 'small';
};

export const PlayersCombo = ({
  playersData,
  value,
  setFormData,
  id,
  label,
  size,
}: PlayersComboProps) => {
  return (
    <Autocomplete
      id={id}
      onChange={(_: any, newValue: string | null) => {
        setFormData((prevData: any) => ({
          ...prevData,
          [id]: newValue,
        }));
      }}
      value={value}
      options={playersData.map((player) => player._id)}
      getOptionLabel={(option) => {
        const player = playersData.find((p) => p._id === option);
        if (player) {
          const { lastName, firstName, club } = player;
          return `${lastName}, ${firstName} (${club.name})`;
        }
        return '';
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" name={id} />
      )}
      size={size}
    />
  );
};
