import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, CircularProgress, FormControl, Button } from '@material-ui/core';
// Custom components
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { UserData } from '../../types/simplifiedData';
// Hooks
import { useUsersState } from '../../context/users/useUsersState';
// Styles
import { useStyles } from './styles';
// Utils & data
import { assignPlaymakerRoleFormInitialValues } from '../../components/forms/initialValues';
import { assignPlaymakerRoleFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  usersData: UserData[];
};

export const AssignPlaymakerRoleForm = ({ usersData }: Props) => {
  const classes = useStyles();
  const { loading, assignPlaymakerRole } = useUsersState();

  return (
    <Formik
      initialValues={assignPlaymakerRoleFormInitialValues}
      validationSchema={assignPlaymakerRoleFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        assignPlaymakerRole(data);
        resetForm();
      }}
    >
      {() => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <UsersCombo usersData={usersData} label="Użytkownik" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                Przyznaj dostęp
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
