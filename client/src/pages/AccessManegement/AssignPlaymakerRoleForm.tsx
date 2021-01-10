import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// MUI components
import { Grid, FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { AssignPlaymakerRoleData, UserBasicInfo } from '../../types/users';

type Props = {
  usersData: UserBasicInfo[];
  onSubmit: (data: AssignPlaymakerRoleData) => void;
};

export const AssignPlaymakerRoleForm = ({ usersData, onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ user: '' }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {() => (
        <Form className={classes.form}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <UsersCombo usersData={usersData} label="Użytkownik" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Nadaj rolę
              </Button>
            </Grid>
          </Grid>
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
