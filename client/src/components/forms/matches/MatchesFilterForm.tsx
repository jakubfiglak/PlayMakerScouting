import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { CompetitionSelect, ClubsCombo } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { MatchesFilterData } from '../../../types/matches';
import { ClubData } from '../../../types/simplifiedData';
// Utils & data
import { formatDateObject, tomorrow, yearFromNow } from '../../../utils';
// Styles
import { useStyles } from '../styles';

type Props = {
  clubsData: ClubData[];
  setFilters: Dispatch<SetStateAction<MatchesFilterData>>;
};

const initialFilters: MatchesFilterData = {
  homeTeam: '',
  awayTeam: '',
  competition: '',
  dateFrom: formatDateObject(yearFromNow),
  dateTo: formatDateObject(tomorrow),
};

export const MatchesFilterForm = ({ clubsData, setFilters }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialFilters}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
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
              <CompetitionSelect size="small" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <Field
                name="dateFrom"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Data od"
                id="dateFrom"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <Field
                name="dateTo"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Data do"
                id="dateTo"
                size="small"
              />
            </Grid>
            <FilterFormActions
              handleClearFilter={() => {
                handleReset();
                setFilters(initialValues);
              }}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
