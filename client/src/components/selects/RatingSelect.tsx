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
// Types
import { RatingScore } from '../../types/reports';

type Props = {
  name: string;
};

export const RatingSelect = ({ name }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  const ratings: RatingScore[] = [1, 2, 3, 4];

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
