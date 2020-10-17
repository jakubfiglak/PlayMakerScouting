import React from 'react';
import { useField } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { VoivodeshipSelect } from '../selects';

type AddressFieldsetProps = {
  namespace: string;
};

export const AddressFieldset = ({ namespace }: AddressFieldsetProps) => {
  const [streetField, streetFieldMeta] = useField(`${namespace}.street`);
  const [streetNoField, streetNoFieldMeta] = useField(`${namespace}.streetNo`);
  const [zipCodeField, zipCodeFieldMeta] = useField(`${namespace}.zipCode`);
  const [cityField, cityFieldMeta] = useField(`${namespace}.city`);
  const [countryField, countryFieldMeta] = useField(`${namespace}.country`);

  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          {...streetField}
          variant="outlined"
          fullWidth
          label="Ulica"
          error={streetFieldMeta.touched && !!streetFieldMeta.error}
          helperText={streetFieldMeta.touched && streetFieldMeta.error}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          {...streetNoField}
          variant="outlined"
          fullWidth
          label="Nr ulicy"
          error={streetNoFieldMeta.touched && !!streetNoFieldMeta.error}
          helperText={streetNoFieldMeta.touched && streetNoFieldMeta.error}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          {...zipCodeField}
          variant="outlined"
          fullWidth
          label="Kod pocztowy"
          error={zipCodeFieldMeta.touched && !!zipCodeFieldMeta.error}
          helperText={zipCodeFieldMeta.touched && zipCodeFieldMeta.error}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <TextField
          {...cityField}
          variant="outlined"
          fullWidth
          label="Miasto"
          error={cityFieldMeta.touched && !!cityFieldMeta.error}
          helperText={cityFieldMeta.touched && cityFieldMeta.error}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <VoivodeshipSelect name={`${namespace}.voivodeship`} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          {...countryField}
          variant="outlined"
          fullWidth
          label="Kraj"
          error={countryFieldMeta.touched && !!countryFieldMeta.error}
          helperText={countryFieldMeta.touched && countryFieldMeta.error}
        />
      </Grid>
    </>
  );
};
