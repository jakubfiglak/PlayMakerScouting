import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { CompetitionSelect, ClubsCombo } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { MatchesFilterData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
// Hooks
import { useForm } from '../../../hooks';
// Utils & data
import { formatDateObject, tomorrow, yearFromNow } from '../../../utils';
// Styles
import { useStyles } from '../styles';

type FilterFormProps = {
  clubsData: ClubData[];
  setFilters: Dispatch<SetStateAction<MatchesFilterData>>;
};

const initialState: MatchesFilterData = {
  homeTeam: '',
  awayTeam: '',
  competition: '',
  dateFrom: formatDateObject(yearFromNow),
  dateTo: formatDateObject(tomorrow),
};

export const MatchesFilterForm = ({
  clubsData,
  setFilters,
}: FilterFormProps) => {
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
            <ClubsCombo
              clubsData={clubsData}
              name="homeTeam"
              label="Gospodarz"
              size="small"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <ClubsCombo
              clubsData={clubsData}
              name="awayTeam"
              label="Gość"
              size="small"
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
