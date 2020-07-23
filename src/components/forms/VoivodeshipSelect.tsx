import React from 'react';
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
import { voivodeships } from '../../data';

const VoivodeshipSelect = ({ onChange, value }: SelectProps) => {
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

export default VoivodeshipSelect;
