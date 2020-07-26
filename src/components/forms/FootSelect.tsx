import React from 'react';
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';

const FootSelect = ({ onChange, value }: SelectProps) => {
  return (
    <>
      <InputLabel id="footed">Noga</InputLabel>
      <Select
        labelId="footed"
        id="footed"
        label="Noga"
        name="footed"
        onChange={onChange}
        value={value}
      >
        <MenuItem value="R">R</MenuItem>
        <MenuItem value="L">L</MenuItem>
      </Select>
    </>
  );
};

export default FootSelect;
