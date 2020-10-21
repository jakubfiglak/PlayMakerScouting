import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid } from '@material-ui/core';
// Custom components
import { DivisionSelect, VoivodeshipSelect } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { ClubsFilterData } from '../../../types/clubs';
// Styles
import { useStyles } from '../styles';

type FilterFormProps = {
  setFilters: Dispatch<SetStateAction<ClubsFilterData>>;
};

const initialFilters: ClubsFilterData = {
  name: '',
  division: '',
  voivodeship: '',
};

export const ClubsFilterForm = ({ setFilters }: FilterFormProps) => {
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
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <DivisionSelect size="small" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <VoivodeshipSelect name="voivodeship" size="small" />
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
