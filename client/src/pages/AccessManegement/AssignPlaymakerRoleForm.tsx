import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { UserData } from '../../types/simplifiedData';
import { AssignPlaymakerRoleData } from '../../types/users';
// Utils & data
import { assignPlaymakerRoleFormInitialValues } from '../../components/forms/initialValues';
import { assignPlaymakerRoleFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  usersData: UserData[];
  onSubmit: (data: AssignPlaymakerRoleData) => void;
};

export const AssignPlaymakerRoleForm = ({ usersData, onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={assignPlaymakerRoleFormInitialValues}
      validationSchema={assignPlaymakerRoleFormValidationSchema}
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
