import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
// Data & utils
import { divisions } from '../../../data';

export const DivisionSelect = ({ onChange, value, required }: SelectProps) => {
  return (
    <>
      <InputLabel id="division">Poziom rozgrywkowy</InputLabel>
      <Select
        labelId="division"
        id="division"
        label="Poziom rozgrywkowy"
        name="division"
        onChange={onChange}
        value={value}
        required={required}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {divisions.map((div) => {
          return (
            <MenuItem key={div} value={div}>
              {div}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
