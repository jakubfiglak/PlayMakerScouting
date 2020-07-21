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
import { PlayersFilterData } from '../../../types/players';
import { ClubData } from '../../../types/simplifiedData';

type FilterFormProps = {
  clubsData: ClubData[];
  setFilters: Dispatch<SetStateAction<PlayersFilterData>>;
};

const initialState: PlayersFilterData = {
  name: '',
  club: '',
  position: '',
};

const PlayersFilterForm = ({ clubsData, setFilters }: FilterFormProps) => {
  const classes = useStyles();
  const [formData, onInputChange, setFormData] = useForm(initialState);

  const { name, club, position } = formData;

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
            label="Nazwisko"
            name="name"
            size="small"
            fullWidth
            onChange={onInputChange}
            value={name}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="club">Klub</InputLabel>
            <Select
              labelId="club"
              id="club"
              label="Klub"
              name="club"
              onChange={onInputChange}
              value={club}
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
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="position">Pozycja</InputLabel>
            <Select
              labelId="position"
              id="position"
              label="Pozycja"
              name="position"
              onChange={onInputChange}
              value={position}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="GK">GK</MenuItem>
              <MenuItem value="D">D</MenuItem>
              <MenuItem value="M">M</MenuItem>
              <MenuItem value="F">F</MenuItem>
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

export default PlayersFilterForm;
