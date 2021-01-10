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

const competitions = [
  {
    value: 'league',
    label: 'Liga',
  },
  {
    value: 'cup',
    label: 'Puchar',
  },
  {
    value: 'friendly',
    label: 'Towarzyski',
  },
];

export const CompetitionSelect = ({ name, size }: Props) => {
  const [field, meta] = useField(name);

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
