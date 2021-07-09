import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { FormModal } from '../FormModal';
import { PositionSelect } from '../selects/PositionSelect';
import { FootSelect } from '../selects/FootSelect';
import { ClubsCombo } from '../selects/ClubsCombo';
// Types
import { ClubBasicInfo } from '../../types/clubs';
import { PlayerDTO } from '../../types/players';
// Utils & data
import { playersFormValidationSchema } from '../../data/forms/validationSchemas';
import { playersFormInitialValues } from '../../data/forms/initialValues';

type Props = {
  clubsData: ClubBasicInfo[];
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PlayerDTO) => void;
};

export const AddPlayerModal = ({
  clubsData,
  open,
  onClose,
  onSubmit,
}: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={playersFormInitialValues}
      validationSchema={playersFormValidationSchema}
      enableReinitialize
      onSubmit={(data) => {
        onSubmit(data);
        onClose();
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <FormModal
          title="Dodaj zawodnika"
          onClose={onClose}
          onSubmit={handleSubmit}
          open={open}
        >
          <Form className={classes.container}>
            <Field
              name="firstName"
              as={TextField}
              variant="outlined"
              autoComplete="fname"
              fullWidth
              label="Imię"
              autoFocus
              error={touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
            <Field
              name="lastName"
              as={TextField}
              variant="outlined"
              autoComplete="lname"
              fullWidth
              label="Nazwisko"
              error={touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
            <FormControl variant="outlined" fullWidth>
              <ClubsCombo clubsData={clubsData} name="club" label="Klub" />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <PositionSelect />
            </FormControl>
            <Field
              name="yearOfBirth"
              as={TextField}
              type="number"
              variant="outlined"
              fullWidth
              label="Rok urodzenia"
              error={touched.yearOfBirth && !!errors.yearOfBirth}
              helperText={touched.yearOfBirth && errors.yearOfBirth}
            />
            <FormControl variant="outlined" fullWidth>
              <FootSelect />
            </FormControl>
          </Form>
        </FormModal>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));
