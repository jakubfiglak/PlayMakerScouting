import React from 'react';
import { useField } from 'formik';
import { FormControlLabel, Checkbox as MUICheckbox } from '@material-ui/core';

type Props = { name: string; label: string };

export const Checkbox = ({ name, label }: Props) => {
  const [field] = useField(name);

  return (
    <FormControlLabel
      control={<MUICheckbox checked={field.value} {...field} color="primary" />}
      label={label}
    />
  );
};
