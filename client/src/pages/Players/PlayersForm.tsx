import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { FootSelect } from '../../components/selects/FootSelect';
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { CountriesCombo } from '../../components/selects/CountriesCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Hooks
import { useAlertsState } from '../../context/alerts/useAlertsState';
// Types
import { ClubBasicInfo } from '../../types/clubs';
import { Player, PlayerDTO } from '../../types/players';
// Utils & data
import { playersFormValidationSchema } from '../../data/forms/validationSchemas';
import { playersFormInitialValues } from '../../data/forms/initialValues';
import { PositionCombo } from '../../components/selects/PositionCombo';

type Props = {
  clubsData: ClubBasicInfo[];
  current: Player | null;
  onSubmit: (data: PlayerDTO) => void;
  addClubOption?: boolean;
  onAddClubClick?: () => void;
  onCancelClick?: () => void;
  fullWidth?: boolean;
};

export const PlayersForm = ({
  clubsData,
  current,
  addClubOption,
  onSubmit,
  onAddClubClick,
  onCancelClick,
  fullWidth,
}: Props) => {
  const { setAlert } = useAlertsState();

  const initialValues: PlayerDTO = current
    ? getInitialStateFromCurrent(current)
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
          <FormContainer fullWidth={fullWidth}>
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
            <CountriesCombo />
            <FormControl variant="outlined" fullWidth>
              <ClubsCombo
                clubsData={clubsData}
                name="club"
                label="Klub"
                addClubOption={addClubOption}
                onAddClubClick={onAddClubClick}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <PositionCombo />
            </FormControl>
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
            <FormControl variant="outlined" fullWidth>
              <FootSelect />
            </FormControl>
            <Field
              name="lnpID"
              as={TextField}
              variant="outlined"
              fullWidth
              label="ID Łączy Nas Piłka"
              error={touched.lnpID && !!errors.lnpID}
              helperText={(touched.lnpID && errors.lnpID) || 'Pole opcjonalne'}
            />
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
            <Field
              name="minut90ProfileURL"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Link do profilu 90minut"
              error={touched.minut90ProfileURL && !!errors.minut90ProfileURL}
              helperText={
                (touched.minut90ProfileURL && errors.minut90ProfileURL) ||
                'Pole opcjonalne'
              }
            />
            <Field
              name="transfermarktProfileURL"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Link do profilu Transfermarkt"
              error={
                touched.transfermarktProfileURL &&
                !!errors.transfermarktProfileURL
              }
              helperText={
                (touched.transfermarktProfileURL &&
                  errors.transfermarktProfileURL) ||
                'Pole opcjonalne'
              }
            />
            <MainFormActions
              label="zawodnika"
              isEditState={!!current}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick();
                }
                handleReset();
                setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

function getInitialStateFromCurrent(player: Player): PlayerDTO {
  const { id, club, author, notesCount, reportsCount, ...rest } = player;

  return {
    ...rest,
    club: club?.id || '',
  };
}
