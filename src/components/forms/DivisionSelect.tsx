import React from 'react';
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
import { divisions } from '../../data';

const DivisionSelect = ({ onChange, value, required }: SelectProps) => {
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

export default DivisionSelect;
