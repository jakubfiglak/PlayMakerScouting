import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { PlayerData } from '../../types/simplifiedData';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { positionLabels } from '../../data/labels';

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
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={['', ...playersData.map((player) => player._id)]}
      getOptionLabel={(option) => {
        const player = playersData.find((p) => p._id === option);
        if (player) {
          const { lastName, firstName, club, position } = player;
          return `${firstName[0]}. ${lastName}, ${getLabel(
            position,
            positionLabels,
          )} (${club.name})`;
        }
        return '';
      }}
      renderInput={(params) => (
        <TextField
          {...params}
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
