import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { PlayerData } from '../../../types/simplifiedData';

type Props = {
  playersData: PlayerData[];
  label: string;
  size?: 'medium' | 'small';
};

export const PlayersCombo = ({ playersData, label, size }: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField('player');

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id="player"
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
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
        <TextField
          {...params}
          {...field}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
    />
  );
};
