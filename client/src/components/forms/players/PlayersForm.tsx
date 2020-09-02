import React, { SyntheticEvent } from 'react';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import {
  ClubsSelect,
  PositionSelect,
  FootSelect,
  ClubsCombo,
} from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { PlayersFormData } from '../../../types/players';
import { ClubData } from '../../../types/simplifiedData';
// Hooks
import { usePlayersState } from '../../../context';
import { useForm } from '../../../hooks';

type PlayersFormProps = {
  clubsData: ClubData[];
};

export const PlayersForm = ({ clubsData }: PlayersFormProps) => {
  const playersContext = usePlayersState();
  const {
    loading,
    addPlayer,
    current,
    clearCurrent,
    editPlayer,
  } = playersContext;

  const initialState: PlayersFormData = current || {
    firstName: '',
    lastName: '',
    club: '',
    position: 'CM',
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
            <ClubsCombo
              clubsData={clubsData}
              value={club}
              id="club"
              setFormData={setPlayerData}
              label="Klub"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <PositionSelect onChange={onInputChange} value={position} />
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
            <FootSelect onChange={onInputChange} value={footed} />
          </FormControl>
        </Grid>
        <MainFormActions
          label="zawodnika"
          current={!!current}
          onCancelClick={onCancelClick}
        />
      </Grid>
    </form>
  );
};
