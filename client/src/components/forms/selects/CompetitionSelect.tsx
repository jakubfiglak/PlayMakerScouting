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
// Data & utis
import { competitions } from '../../../data';

type Props = {
  size?: 'small' | 'medium';
};

export const CompetitionSelect = ({ size }: Props) => {
  const [field, meta] = useField('competition');

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="competition">Rodzaj rozgrywek</InputLabel>
      <Select
        {...field}
        labelId="competition"
        id="competition"
        label="Rodzaj rozgrywek"
        error={touched && !!error}
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
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
