import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { PositionSelect, ClubsCombo } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { PlayersFilterData } from '../../../types/players';
import { ClubData } from '../../../types/simplifiedData';
// Styles
import { useStyles } from '../styles';

type Props = {
  clubsData: ClubData[];
  setFilters: Dispatch<SetStateAction<PlayersFilterData>>;
};

export const PlayersFilterForm = ({ clubsData, setFilters }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ lastName: '', club: '', position: '' }}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwisko"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <FormControl variant="outlined" size="small" fullWidth>
                <ClubsCombo
                  clubsData={clubsData}
                  name="club"
                  label="Klub"
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <FormControl variant="outlined" size="small" fullWidth>
                <PositionSelect />
              </FormControl>
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
