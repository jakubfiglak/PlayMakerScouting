import React from 'react';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  FormControl,
} from '@material-ui/core';
// Data & utils
import { voivodeships } from '../../../data';

export const VoivodeshipSelect = ({ onChange, value }: SelectProps) => {
  return (
    <FormControl variant="outlined" fullWidth>
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
          <em>Inne</em>
        </MenuItem>
        {voivodeships.map((voivodeship) => {
          return (
            <MenuItem key={voivodeship} value={voivodeship}>
              {voivodeship}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
