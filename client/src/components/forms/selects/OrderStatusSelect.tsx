import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';

export const OrderStatusSelect = ({ onChange, value }: SelectProps) => {
  return (
    <>
      <InputLabel id="status">Status</InputLabel>
      <Select
        labelId="status"
        id="status"
        label="Status"
        name="status"
        onChange={onChange}
        value={value}
      >
        <MenuItem value="">Wszystkie</MenuItem>
        <MenuItem value="open">Otwarte</MenuItem>
        <MenuItem value="accepted">Przyjęte do realizacji</MenuItem>
        <MenuItem value="closed">Zamknięte</MenuItem>
      </Select>
    </>
  );
};
