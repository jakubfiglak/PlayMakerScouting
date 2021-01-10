import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import { Grid, FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
// Types
import { ClubBasicInfo, GrantAccessFormData } from '../../types/clubs';
import { UserBasicInfo } from '../../types/users';
// Utils & data
import { clubAccessFormInitialValues } from '../../components/forms/initialValues';
import { clubAccessFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  usersData: UserBasicInfo[];
  clubsData: ClubBasicInfo[];
  onSubmit: (data: GrantAccessFormData) => void;
};

export const ClubAccessForm = ({ usersData, clubsData, onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={clubAccessFormInitialValues}
      validationSchema={clubAccessFormValidationSchema}
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
                <ClubsCombo clubsData={clubsData} name="club" label="Klub" />
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
