import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// MUI components
import { Grid, FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { GrantAccessFormData, PlayerBasicInfo } from '../../types/players';
import { UserBasicInfo } from '../../types/users';

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
      initialValues={{
        user: '',
        player: '',
      }}
      validationSchema={validationSchema}
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

const validationSchema: yup.ObjectSchema<GrantAccessFormData> = yup
  .object({
    user: yup.string().required('Wybierz użytkownika'),
    player: yup.string().required('Wybierz zawodnika'),
  })
  .defined();
