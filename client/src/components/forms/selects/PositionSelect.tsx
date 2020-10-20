import React from 'react';
import { useField } from 'formik';
// MUI components
import { InputLabel, Select, MenuItem } from '@material-ui/core';

export const PositionSelect = () => {
  const [field, fieldMeta] = useField('position');

  return (
    <>
      <InputLabel id="position">Pozycja</InputLabel>
      <Select {...field} labelId="position" id="position" label="Pozycja">
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
