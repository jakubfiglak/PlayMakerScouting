import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../../components/selects/DivisionSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
// Types
import { ClubsFilterData } from '../../types/clubs';

type Props = {
  setFilters: Dispatch<SetStateAction<ClubsFilterData>>;
};

const initialFilters: ClubsFilterData = {
  name: '',
  division: '',
  voivodeship: '',
};

export const ClubsFilterForm = ({ setFilters }: Props) => {
  return (
    <Formik
      initialValues={initialFilters}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3}>
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <DivisionSelect size="small" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
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
