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

type Props = {
  name: string;
  size?: 'small' | 'medium';
};

export const MatchLocationSelect = ({ name, size }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="location">Mecz u siebie/na wyjeździe</InputLabel>
      <Select
        {...field}
        labelId="location"
        id="location"
        label="Mecz u siebie/na wyjeździe"
        error={touched && !!error}
      >
        <MenuItem value="home">U siebie</MenuItem>
        <MenuItem value="away">Na wyjeździe</MenuItem>
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
