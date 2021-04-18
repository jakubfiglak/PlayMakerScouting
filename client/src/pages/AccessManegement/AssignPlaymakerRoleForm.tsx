import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// MUI components
import { FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { UsersCombo } from '../../components/selects/UsersCombo';
import { FormContainer } from '../../components/FormContainer';
// Types
import { UserBasicInfo, AssignPlaymakerRoleData } from '../../types/users';

type Props = {
  usersData: UserBasicInfo[];
  onSubmit: (id: string) => void;
};

export const AssignPlaymakerRoleForm = ({ usersData, onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ user: '' }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data.user);
        resetForm();
      }}
    >
      {() => (
        <Form className={classes.form}>
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <UsersCombo usersData={usersData} label="Użytkownik" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Nadaj rolę
            </Button>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  form: {
    width: '100%',
  },
}));

const validationSchema: yup.ObjectSchema<AssignPlaymakerRoleData> = yup
  .object({
    user: yup.string().required('Wybierz użytkownika'),
  })
  .defined();
