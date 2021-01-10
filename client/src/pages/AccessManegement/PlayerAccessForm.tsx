import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { GrantAccessFormData, PlayerBasicInfo } from '../../types/players';
import { UserBasicInfo } from '../../types/users';
// Utils & data
import { playerAccessFormInitialValues } from '../../components/forms/initialValues';
import { playerAccessFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  usersData: UserBasicInfo[];
  playersData: PlayerBasicInfo[];
  onSubmit: (data: GrantAccessFormData) => void;
};

export const PlayerAccessForm = ({
  usersData,
  playersData,
  onSubmit,
}: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={playerAccessFormInitialValues}
      validationSchema={playerAccessFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {() => (
        <Form className={classes.form}>
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
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Przyznaj dostęp
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
