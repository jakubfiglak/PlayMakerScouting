import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
// Data & utils
import { ratings } from '../../../data';

type Props = {
  name: string;
};

export const RatingSelect = ({ name }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={name}>Ocena</InputLabel>
      <Select
        {...field}
        labelId={name}
        label="Ocena"
        name={name}
        error={touched && !!error}
      >
        {ratings.map((rating) => {
          return (
            <MenuItem key={rating} value={rating}>
              {rating}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
