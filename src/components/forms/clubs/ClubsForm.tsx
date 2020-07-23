import React, { SyntheticEvent } from 'react';
import { Grid, TextField, FormControl } from '@material-ui/core';
import Loader from '../../common/Loader/Loader';
import useForm from '../../../hooks/useForm';
import { ClubsFormData } from '../../../types/clubs';
import useClubsState from '../../../context/clubs/useClubsState';
import DivisionSelect from '../DivisionSelect';
import MainFormActions from '../MainFormActions';

const ClubsForm = () => {
  const clubsContext = useClubsState();
  const { loading, addClub, current, clearCurrent, editClub } = clubsContext;

  const initialState: ClubsFormData = {
    name: current?.name || '',
    address: current?.location.formattedAddress || '',
    division: current?.division || '',
  };
  const [clubData, onInputChange, setClubData] = useForm(initialState);

  const { name, address, division } = clubData;

  const onCancelClick = () => {
    setClubData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (current) {
      editClub(current._id, clubData);
      clearCurrent();
    } else {
      addClub(clubData);
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
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="address"
            label="Adres"
            name="address"
            value={address}
            onChange={onInputChange}
            helperText="np. ul. Cicha 132/16 62-200 Gniezno"
          />
        </Grid>
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

export default ClubsForm;
