import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect, VoivodeshipSelect } from '../selects';
import { MainFormActions } from '../actions';
import { Loader } from '../../common';
// Hooks
import { useClubsState } from '../../../context';
// Types
import { ClubsFormData } from '../../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../initialValues';
import { clubsFormValidationSchema } from '../validationSchemas';

export const ClubsForm = () => {
  const { loading, addClub, editClub, current, clearCurrent } = useClubsState();

  const initialValues: ClubsFormData = current
    ? {
        name: current.name,
        voivodeship: current.voivodeship,
        division: current.division,
        lnpID: current.lnpID,
      }
    : clubsFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={clubsFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        if (current) {
          editClub(current._id, data);
        } else {
          addClub(data);
        }
        clearCurrent();
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
            <Grid item xs={6}>
              <VoivodeshipSelect name="voivodeship" />
            </Grid>
            <Grid item xs={6}>
              <DivisionSelect />
            </Grid>
            <MainFormActions
              label="klub"
              isEditState={!!current}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
