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
import Loader from '../common/Loader/Loader';
import useForm from '../../hooks/useForm';
import { NewPlayer } from '../../types/players';
import { ClubData } from '../../types/simplifiedData';
import usePlayersState from '../../context/players/usePlayersState';

type PlayersFormProps = {
  clubsData: ClubData[];
};

const PlayersForm = ({ clubsData }: PlayersFormProps) => {
  const playersContext = usePlayersState();
  const {
    loading,
    addPlayer,
    current,
    clearCurrent,
    editPlayer,
  } = playersContext;

  const initialState: NewPlayer = current || {
    firstName: '',
    lastName: '',
    club: '',
    position: 'M',
    dateOfBirth: '2000-01-01',
    height: 0,
    weight: 0,
    footed: 'R',
  };
  const [playerData, onInputChange, setPlayerData] = useForm(initialState);

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

  const formattedDate = dateOfBirth.slice(0, 10);

  const onCancelClick = () => {
    setPlayerData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (current) {
      editPlayer(playerData);
      clearCurrent();
    } else {
      addPlayer(playerData);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loader />}
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
            value={formattedDate}
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
            {current ? 'Edytuj zawodnika' : 'Dodaj zawodnika'}
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

export default PlayersForm;
