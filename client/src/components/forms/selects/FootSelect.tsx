import React from 'react';
import { useField } from 'formik';
// MUI components
import { InputLabel, Select, MenuItem } from '@material-ui/core';

export const FootSelect = () => {
  const [field, fieldMeta] = useField('footed');

  return (
    <>
      <InputLabel id="footed">Noga</InputLabel>
      <Select {...field} labelId="footed" id="footed" label="Noga">
        <MenuItem value="R">prawa</MenuItem>
        <MenuItem value="L">lewa</MenuItem>
        <MenuItem value="both">obie</MenuItem>
      </Select>
    </>
  );
};
