import React from 'react';
// MUI components
import { InputLabel, Select, MenuItem, SelectProps } from '@material-ui/core';
// Data & utils
import { ratings } from '../../../data';

export const RatingSelect = ({ onChange, value, name }: SelectProps) => {
  return (
    <>
      <InputLabel id="rating">Ocena</InputLabel>
      <Select
        labelId="rating"
        id={name}
        label="Ocena"
        name={name}
        onChange={onChange}
        value={value}
      >
        {ratings.map((rating) => {
          return (
            <MenuItem key={rating} value={rating}>
              {rating}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
