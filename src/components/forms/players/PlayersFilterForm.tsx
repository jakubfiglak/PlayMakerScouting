import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { TextField, Grid, FormControl } from '@material-ui/core';
import useStyles from '../styles';
import useForm from '../../../hooks/useForm';
import { PlayersFilterData } from '../../../types/players';
import { ClubData } from '../../../types/simplifiedData';
import ClubsSelect from '../ClubsSelect';
import PositionSelect from '../PositionSelect';
import FilterFormActions from '../FilterFormActions';

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
            <ClubsSelect
              clubsData={clubsData}
              onChange={onInputChange}
              value={club}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <PositionSelect onChange={onInputChange} value={position} />
          </FormControl>
        </Grid>
        <FilterFormActions handleClearFilter={handleClearFilter} />
      </Grid>
    </form>
  );
};

export default PlayersFilterForm;
