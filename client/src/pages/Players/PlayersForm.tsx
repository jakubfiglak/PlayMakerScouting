import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import {
  Grid,
  TextField,
  FormControl,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import AddIcon from '@material-ui/icons/Add';
// Custom components
import { PositionSelect } from '../../components/selects/PositionSelect';
import { FootSelect } from '../../components/selects/FootSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
// Types
import { ClubData } from '../../types/simplifiedData';
import { Player, PlayersFormData } from '../../types/players';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Utils & data
import { playersFormValidationSchema } from '../../components/forms/validationSchemas';
import { playersFormInitialValues } from '../../components/forms/initialValues';

type Props = {
  clubsData: ClubData[];
  current: Player | null;
  onSubmit: (data: PlayersFormData) => void;
  onAddClubClick: () => void;
};

export const PlayersForm = ({
  clubsData,
  current,
  onSubmit,
  onAddClubClick,
}: Props) => {
  const classes = useStyles();

  const user = useAuthenticatedUser();

  const initialValues: PlayersFormData = current
    ? {
        firstName: current.firstName,
        lastName: current.lastName,
        club: current.club._id,
        position: current.position,
        yearOfBirth: current.yearOfBirth,
        height: current.height,
        weight: current.weight,
        footed: current.footed,
        lnpID: current.lnpID,
        lnpProfileURL: current.lnpProfileURL,
      }
    : playersFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={playersFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="firstName"
                as={TextField}
                variant="outlined"
                autoComplete="fname"
                fullWidth
                label="Imię"
                autoFocus
                error={touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="lastName"
                as={TextField}
                variant="outlined"
                autoComplete="lname"
                fullWidth
                label="Nazwisko"
                error={touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.clubContainer}>
                <FormControl variant="outlined" fullWidth>
                  <ClubsCombo clubsData={clubsData} name="club" label="Klub" />
                </FormControl>
                <IconButton
                  aria-label="add club"
                  className={classes.addClubButton}
                  onClick={onAddClubClick}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" fullWidth>
                <PositionSelect />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="yearOfBirth"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                label="Rok urodzenia"
                error={touched.yearOfBirth && !!errors.yearOfBirth}
                helperText={touched.yearOfBirth && errors.yearOfBirth}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name="height"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Wzrost [cm]"
                type="number"
                inputProps={{
                  min: 0,
                }}
                error={touched.height && !!errors.height}
                helperText={touched.height && errors.height}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                name="weight"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Waga [kg]"
                type="number"
                inputProps={{
                  min: 0,
                }}
                error={touched.weight && !!errors.weight}
                helperText={touched.weight && errors.weight}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl variant="outlined" fullWidth>
                <FootSelect />
              </FormControl>
            </Grid>
            {user.role === 'admin' && (
              <>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="lnpID"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="ID Łączy Nas Piłka"
                    error={touched.lnpID && !!errors.lnpID}
                    helperText={
                      (touched.lnpID && errors.lnpID) || 'Pole opcjonalne'
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="lnpProfileURL"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Link do profilu ŁNP"
                    error={touched.lnpProfileURL && !!errors.lnpProfileURL}
                    helperText={
                      (touched.lnpProfileURL && errors.lnpProfileURL) ||
                      'Pole opcjonalne'
                    }
                  />
                </Grid>
              </>
            )}
            <MainFormActions
              label="zawodnika"
              isEditState={!!current}
              onCancelClick={handleReset}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  clubContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: `${theme.spacing(1)}px`,
  },
  addClubButton: {
    background: theme.palette.secondary.light,
    width: 40,
    height: 40,
  },
}));
