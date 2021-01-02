import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, TextField } from '@material-ui/core';
// Custom components
import { FormModal } from '../../components/FormModal';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { DivisionSelect } from '../../components/selects/DivisionSelect';
// Types
import { ClubsFormData } from '../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../../components/forms/initialValues';
import { clubsFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  onClose: () => void;
  onSubmit: (data: ClubsFormData) => void;
};

export const AddClubModal = ({ onClose, onSubmit }: Props) => {
  return (
    <Formik
      initialValues={clubsFormInitialValues}
      validationSchema={clubsFormValidationSchema}
      enableReinitialize
      onSubmit={(data) => {
        onSubmit(data);
        onClose();
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <FormModal title="Dodaj klub" onClose={onClose} onSubmit={handleSubmit}>
          <Form>
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
              <Grid item xs={12}>
                <VoivodeshipSelect name="voivodeship" />
              </Grid>
              <Grid item xs={12}>
                <DivisionSelect />
              </Grid>
            </Grid>
          </Form>
        </FormModal>
      )}
    </Formik>
  );
};
