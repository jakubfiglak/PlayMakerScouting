import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { ClubsCombo } from '../../components/selects/ClubsCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { Match, MatchDTO } from '../../types/matches';
import { ClubBasicInfo } from '../../types/clubs';
import { Competition } from '../../types/reports';
// Utils & data
import { formatDateObject } from '../../utils/dates';
import { CompetitionSelect } from '../../components/selects/CompetitionSelect';

type Props = {
  clubsData: ClubBasicInfo[];
  current: Match | null;
  onSubmit: (data: MatchDTO) => void;
  onCancelClick: () => void;
};

export const MatchesForm = ({
  clubsData,
  current,
  onSubmit,
  onCancelClick,
}: Props) => {
  const initialValues: MatchDTO = current
    ? getInitialStateFromCurrent(current)
    : matchesFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <ClubsCombo
                clubsData={clubsData}
                name="homeTeam"
                label="Gospodarz"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <ClubsCombo clubsData={clubsData} name="awayTeam" label="Gość" />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <CompetitionSelect name="competition" />
            </FormControl>
            <Field
              name="date"
              as={TextField}
              type="date"
              variant="outlined"
              fullWidth
              label="Data"
              id="date"
              error={touched.date && !!errors.date}
              helperText={touched.date && errors.date}
            />
            <Field
              name="result"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Wynik"
              error={touched.result && !!errors.result}
              helperText={touched.result && errors.result}
            />
            <Field
              name="videoURL"
              as={TextField}
              variant="outlined"
              fullWidth
              label="VideoURL"
              error={touched.videoURL && !!errors.videoURL}
              helperText={touched.videoURL && errors.videoURL}
            />
            <MainFormActions
              label="mecz"
              isEditState={!!current}
              onCancelClick={() => {
                onCancelClick();
                handleReset();
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const date = new Date();

const matchesFormInitialValues: MatchDTO = {
  homeTeam: '',
  awayTeam: '',
  competition: 'league',
  date: formatDateObject(date),
  result: '',
  videoURL: '',
};

const validationSchema: yup.ObjectSchema<MatchDTO> = yup
  .object({
    homeTeam: yup.string().required('Wybierz drużynę gospodarzy'),
    awayTeam: yup.string().required('Wybierz drużynę gości'),
    competition: yup.mixed<Competition>().required(),
    date: yup.string().required('Wybierz datę meczu'),
    result: yup.string().notRequired(),
    videoURL: yup.string().url('Niepoprawny format url').notRequired(),
  })
  .defined();

function getInitialStateFromCurrent(match: Match): MatchDTO {
  const { id, author, createdAt, isPublic, updatedAt, ...rest } = match;

  const matchDate = new Date(rest.date);

  return {
    ...rest,
    date: formatDateObject(matchDate),
    homeTeam: rest.homeTeam.id,
    awayTeam: rest.awayTeam.id,
  };
}
