import React, { SyntheticEvent } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Loader from '../../common/Loader/Loader';
import useForm from '../../../hooks/useForm';
import { ClubsFormData } from '../../../types/clubs';
import useClubsState from '../../../context/clubs/useClubsState';
import { divisions } from '../../../data';

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
            <InputLabel id="club">Klub</InputLabel>
            <Select
              labelId="division"
              id="division"
              label="Poziom rozgrywkowy"
              name="division"
              onChange={onInputChange}
              value={division}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {divisions.map((div) => {
                return (
                  <MenuItem key={div} value={div}>
                    {div}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {current ? 'Edytuj klub' : 'Dodaj klub'}
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onCancelClick}
          >
            Anuluj zmiany
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClubsForm;
