import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { TextField, Grid, FormControl } from '@material-ui/core';
import useStyles from '../styles';
import useForm from '../../../hooks/useForm';
import { ClubsFilterData } from '../../../types/clubs';
import DivisionSelect from '../DivisionSelect';
import VoivodeshipSelect from '../VoivodeshipSelect';
import FilterFormActions from '../FilterFormActions';

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
            <DivisionSelect onChange={onInputChange} value={division} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <VoivodeshipSelect onChange={onInputChange} value={voivodeship} />
          </FormControl>
        </Grid>
        <FilterFormActions handleClearFilter={handleClearFilter} />
      </Grid>
    </form>
  );
};

export default ClubsFilterForm;
