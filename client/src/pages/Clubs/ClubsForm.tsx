import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../../components/selects/DivisionSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { Club, ClubsFormData } from '../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../../data/forms/initialValues';
import { clubsFormValidationSchema } from '../../data/forms/validationSchemas';

type Props = {
  current: Club | null;
  onSubmit: (data: ClubsFormData) => void;
  onCancelClick: () => void;
  onEditCancelClick: () => void;
};

export const ClubsForm = ({
  current,
  onSubmit,
  onCancelClick,
  onEditCancelClick,
}: Props) => {
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
        onSubmit(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          <FormContainer>
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
            <VoivodeshipSelect name="voivodeship" />
            <DivisionSelect />
            <MainFormActions
              label="klub"
              isEditState={!!current}
              onCancelClick={() => {
                onCancelClick();
                handleReset();
              }}
              onEditCancelClick={onEditCancelClick}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
