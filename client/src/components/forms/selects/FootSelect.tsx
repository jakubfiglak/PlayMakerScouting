import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';

export const FootSelect = ({ onChange, value }: SelectProps) => {
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
        <MenuItem value="R">prawa</MenuItem>
        <MenuItem value="L">lewa</MenuItem>
        <MenuItem value="both">obie</MenuItem>
      </Select>
    </>
  );
};
