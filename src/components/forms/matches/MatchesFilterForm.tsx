import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
import { TextField, Grid, FormControl } from '@material-ui/core';
import useStyles from '../styles';
import useForm from '../../../hooks/useForm';
import { MatchesFilterData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
import ClubsSelect from '../ClubsSelect';
import CompetitionSelect from '../CompetitionSelect';
import FilterFormActions from '../FilterFormActions';
import { formatDateObject, formatDate } from '../../../utils';

type FilterFormProps = {
  clubsData: ClubData[];
  setFilters: Dispatch<SetStateAction<MatchesFilterData>>;
};

const initialState: MatchesFilterData = {
  homeTeam: '',
  awayTeam: '',
  competition: '',
  dateFrom: formatDateObject(new Date()),
  dateTo: formatDateObject(new Date()),
};

const MatchesFilterForm = ({ clubsData, setFilters }: FilterFormProps) => {
  const classes = useStyles();
  const [formData, onInputChange, setFormData] = useForm(initialState);

  const { homeTeam, awayTeam, competition, dateFrom, dateTo } = formData;

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
          <FormControl variant="outlined" size="small" fullWidth>
            <ClubsSelect
              clubsData={clubsData}
              onChange={onInputChange}
              value={homeTeam}
              id="homeTeam"
              label="Gospodarz"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <ClubsSelect
              clubsData={clubsData}
              onChange={onInputChange}
              value={awayTeam}
              id="awayTeam"
              label="Gość"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <CompetitionSelect onChange={onInputChange} value={competition} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            label="Data od"
            id="dateFrom"
            name="dateFrom"
            size="small"
            value={dateFrom}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            label="Data do"
            id="dateTo"
            name="dateTo"
            size="small"
            value={dateTo}
            onChange={onInputChange}
          />
        </Grid>
        <FilterFormActions handleClearFilter={handleClearFilter} />
      </Grid>
    </form>
  );
};

export default MatchesFilterForm;
