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

import useForm from '../../hooks/useForm';
import { NewPlayer } from '../../types/players';
import { ClubData } from '../../types/simplifiedData';

type PlayersFormProps = {
  clubsData: ClubData[];
};

const initialState: NewPlayer = {
  firstName: '',
  lastName: '',
  club: '',
  position: 'M',
  dateOfBirth: '2000-01-01',
  height: 0,
  weight: 0,
  footed: 'R',
};

const PlayersForm = ({ clubsData }: PlayersFormProps) => {
  const [playerData, onInputChange] = useForm(initialState);

  const {
    firstName,
    lastName,
    club,
    position,
    dateOfBirth,
    height,
    weight,
    footed,
  } = playerData;

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(playerData);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Imię"
            autoFocus
            value={firstName}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="surname"
            label="Nazwisko"
            name="lastName"
            autoComplete="lname"
            value={lastName}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="club">Klub</InputLabel>
            <Select
              labelId="club"
              id="club"
              label="Klub"
              name="club"
              onChange={onInputChange}
              value={club}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clubsData.map((clubData) => {
                const { _id, name: clubName } = clubData;

                return (
                  <MenuItem key={_id} value={_id}>
                    {clubName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="position">Pozycja</InputLabel>
            <Select
              labelId="position"
              id="position"
              label="Pozycja"
              name="position"
              onChange={onInputChange}
              value={position}
            >
              <MenuItem value="GK">GK</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="F">F</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            variant="outlined"
            required
            fullWidth
            label="Data urodzenia"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="height"
            label="Wzrost [cm]"
            name="height"
            type="number"
            inputProps={{
              min: 0,
            }}
            value={height}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="weight"
            label="Waga [kg]"
            name="weight"
            type="number"
            inputProps={{
              min: 0,
            }}
            value={weight}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="footed">Noga</InputLabel>
            <Select
              labelId="footed"
              id="footed"
              label="Noga"
              name="footed"
              onChange={onInputChange}
              value={footed}
            >
              <MenuItem value="R">R</MenuItem>
              <MenuItem value="L">L</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Zapisz
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlayersForm;
