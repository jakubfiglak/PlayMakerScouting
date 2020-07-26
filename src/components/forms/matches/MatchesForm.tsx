import React, { SyntheticEvent } from 'react';
import { Grid, TextField, FormControl } from '@material-ui/core';
import Loader from '../../common/Loader/Loader';
import useForm from '../../../hooks/useForm';
import { MatchesFormData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
import ClubsSelect from '../ClubsSelect';
import MainFormActions from '../MainFormActions';
import useMatchesState from '../../../context/matches/useMatchesState';
import { formatDateObject } from '../../../utils';
import CompetitionSelect from '../CompetitionSelect';

type MatchesFormProps = {
  clubsData: ClubData[];
};

const MatchesForm = ({ clubsData }: MatchesFormProps) => {
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
    date: current?.date || formatDateObject(new Date()),
  };
  const [matchData, onInputChange, setMatchData] = useForm(initialState);

  const { homeTeam, awayTeam, competition, date } = matchData;

  const onCancelClick = () => {
    setMatchData(initialState);
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(matchData);

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
            <ClubsSelect
              id="homeTeam"
              label="Gospodarz"
              clubsData={clubsData}
              onChange={onInputChange}
              value={homeTeam}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <ClubsSelect
              id="awayTeam"
              label="Gość"
              clubsData={clubsData}
              onChange={onInputChange}
              value={awayTeam}
              required
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

export default MatchesForm;
