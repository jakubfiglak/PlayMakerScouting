import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
// Utils & data
import { positions } from '../../utils/constants';
import { getLabel } from '../../utils/getLabel';

export const PositionSelect = () => {
  const [field, fieldMeta] = useField('position');

  const { error, touched } = fieldMeta;

  return (
    <>
      <InputLabel id="position">Pozycja</InputLabel>
      <Select
        {...field}
        labelId="position"
        id="position"
        label="Pozycja"
        error={touched && !!error}
      >
        {positions.map((position) => (
          <MenuItem value={position} key={position}>
            {getLabel(position)}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
