import React from 'react';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { VoivodeshipSelect } from '../selects';
// Types
import { OnChangeFn, Voivodeship } from '../../../types/common';

type AddressFieldsetProps = {
  streetValue: string;
  streetNoValue: string;
  zipCodeValue: string;
  cityValue: string;
  voivodeshipValue: Voivodeship | '';
  countryValue: string;
  onChange: OnChangeFn;
};

export const AddressFieldset = ({
  streetValue,
  streetNoValue,
  zipCodeValue,
  cityValue,
  voivodeshipValue,
  countryValue,
  onChange,
}: AddressFieldsetProps) => {
  return (
    <>
      <Grid item xs={12} sm={8}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="street"
          label="Ulica"
          name="street"
          value={streetValue}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="streetNo"
          label="Nr ulicy"
          name="streetNo"
          value={streetNoValue}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="zipCode"
          label="Kod pocztowy"
          name="zipCode"
          value={zipCodeValue}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={7}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="city"
          label="Miasto"
          name="city"
          value={cityValue}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <VoivodeshipSelect value={voivodeshipValue} onChange={onChange} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="country"
          label="Kraj"
          name="country"
          value={countryValue}
          onChange={onChange}
        />
      </Grid>
    </>
  );
};
