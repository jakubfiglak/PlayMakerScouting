import React from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useStyles from './styles';
import useForm from '../../hooks/useForm';
import { FilterFormData } from './types';

const initialState: FilterFormData = {
  name: '',
  club: '',
  position: '',
};

const PlayersFilterForm = () => {
  const classes = useStyles();
  const [filterData, onInputChange, setFormData] = useForm(initialState);

  return (
    <form autoComplete="off">
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
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Filtruj
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PlayersFilterForm;
