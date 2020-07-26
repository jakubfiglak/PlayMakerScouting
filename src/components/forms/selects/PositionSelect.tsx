import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';

export const PositionSelect = ({ onChange, value }: SelectProps) => {
  return (
    <>
      <InputLabel id="position">Pozycja</InputLabel>
      <Select
        labelId="position"
        id="position"
        label="Pozycja"
        name="position"
        onChange={onChange}
        value={value}
      >
        <MenuItem value="GK">GK</MenuItem>
        <MenuItem value="D">D</MenuItem>
        <MenuItem value="M">M</MenuItem>
        <MenuItem value="F">F</MenuItem>
      </Select>
    </>
  );
};
