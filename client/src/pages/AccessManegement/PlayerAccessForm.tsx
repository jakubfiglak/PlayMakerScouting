import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
// MUI components
import { FormControl, Button, makeStyles } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { UsersCombo } from '../../components/selects/UsersCombo';
import { FormContainer } from '../../components/FormContainer';
// Types
import {
  GrantAccessFormData,
  PlayerBasicInfo,
  GrantAccessArgs,
} from '../../types/players';
import { UserBasicInfo } from '../../types/users';

type Props = {
  usersData: UserBasicInfo[];
  playersData: PlayerBasicInfo[];
  onSubmit: ({ playerId, userId }: GrantAccessArgs) => void;
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
        onSubmit({ playerId: data.player, userId: data.user });
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
              <PlayersCombo playersData={playersData} label="Zawodnik" />
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
    player: yup.string().required('Wybierz zawodnika'),
  })
  .defined();
