import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../selects';
import { MainFormActions } from '../actions';
import { AddressFieldset } from '../fieldsets';
import { Loader } from '../../common';
// Types
import { ClubsFormData } from '../../../types/clubs';
// Hooks
import { useClubsState } from '../../../context';

export const ClubsForm = () => {
  const { loading, addClub, current, clearCurrent, editClub } = useClubsState();

  const initialValues: ClubsFormData = current
    ? {
        name: current.name,
        division: current.division,
        address: current.address,
      }
    : {
        name: '',
        division: '',
        address: {
          street: '',
          streetNo: '',
          zipCode: '',
          city: '',
          voivodeship: '',
          country: 'Polska',
        },
      };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        if (current) {
          editClub(current._id, data);
          clearCurrent();
          resetForm();
        } else {
          addClub(data);
          resetForm();
        }
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
              current={!!current}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
