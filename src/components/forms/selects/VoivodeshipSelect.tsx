import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
// Data & utils
import { voivodeships } from '../../../data';

export const VoivodeshipSelect = ({ onChange, value }: SelectProps) => {
  return (
    <>
      <InputLabel id="voivodeship">Województwo</InputLabel>
      <Select
        labelId="voivodeship"
        id="voivodeship"
        label="Województwo"
        name="voivodeship"
        onChange={onChange}
        value={value}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {voivodeships.map((voivod) => {
          const { value: voivodValue, label } = voivod;

          return (
            <MenuItem key={voivodValue} value={voivodValue}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
