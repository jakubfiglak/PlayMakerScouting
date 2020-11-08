import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../selects';
import { MainFormActions } from '../actions';
import { AddressFieldset } from '../fieldsets';
import { Loader } from '../../common';
// Hooks
import { useClubsState } from '../../../context';
// Utils & data
import { clubsFormInitialValues } from '../initialValues';
import { clubsFormValidationSchema } from '../validationSchemas';

export const ClubsForm = () => {
  const { loading, addClub } = useClubsState();

  return (
    <Formik
      initialValues={clubsFormInitialValues}
      validationSchema={clubsFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        addClub(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          {loading && <Loader />}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Nazwa"
                autoFocus
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <AddressFieldset namespace="address" />
            <Grid item xs={12}>
              <DivisionSelect />
            </Grid>
            <MainFormActions
              label="klub"
              current={false}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
