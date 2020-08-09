import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
// Data & utis
import { competitions } from '../../../data';

export const CompetitionSelect = ({
  onChange,
  value,
  required,
}: SelectProps) => {
  return (
    <>
      <InputLabel id="competition">Rodzaj rozgrywek</InputLabel>
      <Select
        labelId="competition"
        id="competition"
        label="Poziom rozgrywkowy"
        name="competition"
        onChange={onChange}
        value={value}
        required={required}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {competitions.map((comp) => {
          return (
            <MenuItem key={comp.value} value={comp.value}>
              {comp.label}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
