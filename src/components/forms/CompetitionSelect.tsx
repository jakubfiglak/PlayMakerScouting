import React from 'react';
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
import { competitions } from '../../data';

const CompetitionSelect = ({ onChange, value, required }: SelectProps) => {
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

export default CompetitionSelect;
