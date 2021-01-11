import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// MUI components
import { FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
import { FormContainer } from '../../components/FormContainer';
// Types
import { ClubBasicInfo, GrantAccessFormData } from '../../types/clubs';
import { UserBasicInfo } from '../../types/users';

type Props = {
  usersData: UserBasicInfo[];
  clubsData: ClubBasicInfo[];
  onSubmit: (data: GrantAccessFormData) => void;
};

export const ClubAccessForm = ({ usersData, clubsData, onSubmit }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        user: '',
        club: '',
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
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <UsersCombo usersData={usersData} label="Użytkownik" />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <ClubsCombo clubsData={clubsData} name="club" label="Klub" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Przyznaj dostęp
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

const validationSchema: yup.ObjectSchema<GrantAccessFormData> = yup
  .object({
    user: yup.string().required('Wybierz użytkownika'),
    club: yup.string().required('Wybierz klub'),
  })
  .defined();
