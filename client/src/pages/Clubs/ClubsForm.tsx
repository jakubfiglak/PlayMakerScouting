import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../../components/selects/DivisionSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { Loader } from '../../components/Loader';
// Hooks
import { useClubsState } from '../../context/clubs/useClubsState';
// Types
import { ClubsFormData } from '../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../../components/forms/initialValues';
import { clubsFormValidationSchema } from '../../components/forms/validationSchemas';

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
