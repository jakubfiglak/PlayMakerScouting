import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, makeStyles } from '@material-ui/core';
// Custom components
import { FormContainer } from '../../components/FormContainer';
// Types
import { UpdatePasswordData } from '../../types/auth';
// Utils & data
import { passwordValidationSchema } from '../../data/forms/validationSchemas';

type Props = {
  onSubmit: (data: UpdatePasswordData) => void;
};

export const UpdatePasswordForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }}
      onSubmit={(data) => onSubmit(data)}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={classes.container}>
          <FormContainer>
            <Field
              name="oldPassword"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Bieżące hasło"
              type="password"
              id="oldPassword"
              error={touched.oldPassword && !!errors.oldPassword}
              helperText={touched.oldPassword && errors.oldPassword}
            />
            <Field
              name="newPassword"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nowe hasło"
              type="password"
              id="newPassword"
              error={touched.newPassword && !!errors.newPassword}
              helperText={touched.newPassword && errors.newPassword}
            />
            <Field
              name="newPasswordConfirm"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Potwierdź nowe hasło"
              type="password"
              id="newPasswordConfirm"
              error={touched.newPasswordConfirm && !!errors.newPasswordConfirm}
              helperText={
                touched.newPasswordConfirm && errors.newPasswordConfirm
              }
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Zmień hasło
            </Button>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
  },
}));

const validationSchema: yup.ObjectSchema<UpdatePasswordData> = yup
  .object({
    oldPassword: yup.string().required('Podaj aktualne hasło'),
    newPassword: passwordValidationSchema,
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();
