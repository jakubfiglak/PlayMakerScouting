import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
// Utils & data
import { matchLocationLabels } from '../../data/labels';

type Props = {
  name: string;
  size?: 'small' | 'medium';
};

export const MatchLocationSelect = ({ name, size }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="location">Dom/wyjazd</InputLabel>
      <Select
        {...field}
        labelId="location"
        id="location"
        label="Dom/wyjazd"
        error={touched && !!error}
      >
        {matchLocationLabels.map((location) => (
          <MenuItem value={location.value} key={location.value}>
            {location.label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};