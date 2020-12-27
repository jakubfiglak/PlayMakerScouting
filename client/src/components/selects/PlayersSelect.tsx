import React from 'react';
// MUI components
import { Select, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
// Types
import { PlayerData } from '../../types/simplifiedData';

type PlayersSelectProps = {
  playersData: PlayerData[];
} & SelectProps;

export const PlayersSelect = ({
  playersData,
  onChange,
  value,
  required,
  id,
  label,
}: PlayersSelectProps) => {
  return (
    <>
      <InputLabel id={id || 'player'}>{label || 'Zawodnik'}</InputLabel>
      <Select
        labelId={id || 'player'}
        id={id || 'player'}
        label={label || 'Zawodnik'}
        name={id || 'player'}
        onChange={onChange}
        value={value}
        required={required}
      >
        {playersData.map((playerData) => {
          const { _id, firstName, lastName, club } = playerData;

          return (
            <MenuItem key={_id} value={_id}>
              {`${lastName}, ${firstName} (${club.name})`}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
