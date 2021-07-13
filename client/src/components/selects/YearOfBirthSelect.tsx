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

type Props = { name: string; label: string; size?: 'small' | 'medium' };

export const YearOfBirthSelect = ({ name, label, size }: Props) => {
  const [field, fieldMeta] = useField(name);

  const { error, touched } = fieldMeta;

  const year = new Date().getFullYear();
  const minYob = year - 35;
  const maxYob = year - 15;

  const yearArray = Array.from(
    { length: maxYob - minYob + 1 },
    (_, i) => i + minYob,
  );

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id={`${name}Label`}>{label}</InputLabel>
      <Select
        {...field}
        labelId={`${name}Label`}
        id={name}
        label={label}
        error={touched && !!error}
      >
        <MenuItem value={0}>Wszystkie</MenuItem>
        {yearArray.map((yob) => (
          <MenuItem value={yob} key={yob}>
            {yob}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
