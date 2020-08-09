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
        <MenuItem value="GK">Bramkarz</MenuItem>
        <MenuItem value="CB">Środkowy obrońca</MenuItem>
        <MenuItem value="FB">Boczny obrońca</MenuItem>
        <MenuItem value="CM">Środkowy pomocnik</MenuItem>
        <MenuItem value="WM">Boczny pomocnik</MenuItem>
        <MenuItem value="F">Napastnik</MenuItem>
      </Select>
    </>
  );
};
