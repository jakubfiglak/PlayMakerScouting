import React, { SyntheticEvent } from 'react';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../selects';
import { MainFormActions } from '../actions';
import { AddressFieldset } from '../fieldsets';
import { Loader } from '../../common';
// Types
import { ClubsFormData } from '../../../types/clubs';
// Hooks
import { useClubsState } from '../../../context';
import { useForm } from '../../../hooks';

export const ClubsForm = () => {
  const clubsContext = useClubsState();
  const { loading, addClub, current, clearCurrent, editClub } = clubsContext;

  const initialState: ClubsFormData = {
    name: current?.name || '',
    street: current?.address.street || '',
    streetNo: current?.address.streetNo || '',
    zipCode: current?.address.zipCode || '',
    city: current?.address.city || '',
    voivodeship: current?.address.voivodeship || '',
    country: current?.address.country || '',
    division: current?.division || '',
  };
  const [clubData, onInputChange, setClubData] = useForm(initialState);

  const {
    name,
    street,
    streetNo,
    zipCode,
    city,
    voivodeship,
    country,
    division,
  } = clubData;

  const onCancelClick = () => {
    setClubData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formattedClubData = {
      name,
      address: {
        street,
        streetNo,
        zipCode,
        city,
        voivodeship,
        country,
      },
      division,
    };

    if (current) {
      editClub(current._id, formattedClubData);
      clearCurrent();
    } else {
      addClub(formattedClubData);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Nazwa"
            autoFocus
            value={name}
            onChange={onInputChange}
          />
        </Grid>
        <AddressFieldset
          streetValue={street}
          streetNoValue={streetNo}
          zipCodeValue={zipCode}
          cityValue={city}
          voivodeshipValue={voivodeship}
          countryValue={country}
          onChange={onInputChange}
        />
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <DivisionSelect
              onChange={onInputChange}
              value={division}
              required
            />
          </FormControl>
        </Grid>
        <MainFormActions
          label="klub"
          current={!!current}
          onCancelClick={onCancelClick}
        />
      </Grid>
    </form>
  );
};
