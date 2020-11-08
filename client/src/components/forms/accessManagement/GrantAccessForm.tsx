import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, CircularProgress, FormControl, Button } from '@material-ui/core';
// Custom components
import { PlayersCombo, UsersCombo } from '../selects';
// Types
import { PlayerData, UserData } from '../../../types/simplifiedData';
// Hooks
import { usePlayersState } from '../../../context';
// Styles
import { useStyles } from './styles';
// Utils & data
import { grantAccessFormInitialValues } from '../initialValues';
import { grantAccessFormValidationSchema } from '../validationSchemas';

type Props = {
  usersData: UserData[];
  playersData: PlayerData[];
};

export const GrantAccessForm = ({ usersData, playersData }: Props) => {
  const classes = useStyles();
  const { loading, grantAccess } = usePlayersState();

  return (
    <Formik
      initialValues={grantAccessFormInitialValues}
      validationSchema={grantAccessFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        grantAccess(data);
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
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <PlayersCombo playersData={playersData} label="Zawodnik" />
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
