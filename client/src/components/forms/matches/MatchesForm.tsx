import React, { SyntheticEvent } from 'react';
// MUI components
import { Grid, TextField, FormControl } from '@material-ui/core';
// Custom components
import { ClubsSelect, CompetitionSelect, ClubsCombo } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Types
import { MatchesFormData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
// Hooks
import { useMatchesState } from '../../../context';
import { useForm } from '../../../hooks';
// Utils & data
import { formatDateObject } from '../../../utils';

type MatchesFormProps = {
  clubsData: ClubData[];
};

export const MatchesForm = ({ clubsData }: MatchesFormProps) => {
  const matchesContext = useMatchesState();
  const {
    loading,
    addMatch,
    current,
    clearCurrent,
    editMatch,
  } = matchesContext;

  const initialState: MatchesFormData = {
    homeTeam: current?.homeTeam._id || '',
    awayTeam: current?.awayTeam._id || '',
    competition: current?.competition || '',
    date:
      current && current.date
        ? current.date.slice(0, 10)
        : formatDateObject(new Date()),
  };
  const [matchData, onInputChange, setMatchData] = useForm(initialState);

  const { homeTeam, awayTeam, competition, date } = matchData;

  const onCancelClick = () => {
    setMatchData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (current) {
      editMatch(current._id, matchData);
      clearCurrent();
    } else {
      addMatch(matchData);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {loading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <ClubsCombo
              clubsData={clubsData}
              value={homeTeam}
              id="homeTeam"
              setFormData={setMatchData}
              label="Gospodarz"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <ClubsCombo
              clubsData={clubsData}
              value={awayTeam}
              id="awayTeam"
              setFormData={setMatchData}
              label="Gość"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <CompetitionSelect
              onChange={onInputChange}
              value={competition}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            label="Data"
            id="date"
            name="date"
            value={date}
            onChange={onInputChange}
          />
        </Grid>
        <MainFormActions
          label="mecz"
          current={!!current}
          onCancelClick={onCancelClick}
        />
      </Grid>
    </form>
  );
};
