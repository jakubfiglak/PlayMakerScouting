import React from 'react';
// MUI components
import { Select, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
// Types
import { ClubData } from '../../types/simplifiedData';

type ClubsSelectProps = {
  clubsData: ClubData[];
} & SelectProps;

export const ClubsSelect = ({
  clubsData,
  onChange,
  value,
  required,
  id,
  label,
}: ClubsSelectProps) => {
  return (
    <>
      <InputLabel id={id || 'club'}>{label || 'Klub'}</InputLabel>
      <Select
        labelId={id || 'club'}
        id={id || 'club'}
        label={label || 'Klub'}
        name={id || 'club'}
        onChange={onChange}
        value={value}
        required={required}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {clubsData.map((clubData) => {
          const { _id, name: clubName } = clubData;

          return (
            <MenuItem key={_id} value={_id}>
              {clubName}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
