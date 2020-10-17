import React from 'react';
import { useField } from 'formik';
// MUI components
import { InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
// Data & utils
import { voivodeships } from '../../../data';

type VoivodeshipSelectProps = { size?: 'small' | 'medium'; name: string };

export const VoivodeshipSelect = ({ name, size }: VoivodeshipSelectProps) => {
  const [field, meta] = useField(name);

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="voivodeship">Województwo</InputLabel>
      <Select
        {...field}
        labelId="voivodeship"
        label="Województwo"
        name={name}
        error={meta.touched && !!meta.error}
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
