import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from '../styles';
import useForm from '../../../hooks/useForm';
import { ClubsFilterData } from '../../../types/clubs';
import { divisions, voivodeships } from '../../../data';

type FilterFormProps = {
  setFilters: Dispatch<SetStateAction<ClubsFilterData>>;
};

const initialState: ClubsFilterData = {
  name: '',
  division: '',
  voivodeship: '',
};

const ClubsFilterForm = ({ setFilters }: FilterFormProps) => {
  const classes = useStyles();
  const [formData, onInputChange, setFormData] = useForm(initialState);

  const { name, division, voivodeship } = formData;

  const handleClearFilter = () => {
    setFormData(initialState);
    setFilters(initialState);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setFilters(formData);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <TextField
            variant="outlined"
            id="name"
            label="Nazwa"
            name="name"
            size="small"
            fullWidth
            onChange={onInputChange}
            value={name}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="division">Poziom rozgrywkowy</InputLabel>
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
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="voivodeship">Województwo</InputLabel>
            <Select
              labelId="voivodeship"
              id="voivodeship"
              label="Województwo"
              name="voivodeship"
              onChange={onInputChange}
              value={voivodeship}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {voivodeships.map((voivod) => {
                const { value, label } = voivod;

                return (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          xs={12}
          sm={6}
          lg={3}
          className={classes.input}
          spacing={2}
        >
          <Grid item xs={6}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
            >
              Filtruj
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClearFilter}
            >
              Wyczyść filtr
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default ClubsFilterForm;
