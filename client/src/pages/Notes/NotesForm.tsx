import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MatchesCombo } from '../../components/selects/MatchesCombo';
import { PositionSelect } from '../../components/selects/PositionSelect';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { Note, NoteDTO } from '../../types/notes';
import { PlayerBasicInfo, Position } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';

type Props = {
  playersData: PlayerBasicInfo[];
  matchesData: MatchBasicInfo[];
  current: Note | null;
  onSubmit: (data: NoteDTO) => void;
  onCancelClick: () => void;
};

export const NotesForm = ({
  playersData,
  matchesData,
  current,
  onSubmit,
  onCancelClick,
}: Props) => {
  const initialValues: NoteDTO = current
    ? getInitialStateFromCurrent(current)
    : notesFormInitialValues;

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
      {({ errors, touched, values, handleReset }) => (
        <Form>
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <PlayersCombo
                playersData={playersData}
                name="player"
                label="Zawodnik"
              />
            </FormControl>
            <Field
              name="shirtNo"
              as={TextField}
              type="number"
              variant="outlined"
              fullWidth
              label="Nr na koszulce"
              id="shirtNo"
              error={touched.shirtNo && !!errors.shirtNo}
              helperText={touched.shirtNo && errors.shirtNo}
              InputProps={{ inputProps: { min: 1, max: 99 } }}
            />
            <FormControl variant="outlined" fullWidth>
              <MatchesCombo
                matchesData={matchesData}
                name="match"
                label="Mecz"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <PositionSelect
                name="positionPlayed"
                helperText="Podaj pozycję, na której zawodnik zagrał w danym meczu"
              />
            </FormControl>
            <Field
              name="maxRatingScore"
              as={TextField}
              variant="outlined"
              type="number"
              fullWidth
              label="Ocena maksymalna"
              error={touched.maxRatingScore && !!errors.maxRatingScore}
              helperText={touched.maxRatingScore && errors.maxRatingScore}
              InputProps={{ inputProps: { min: 2, max: 10 } }}
            />
            <RatingInput max={values.maxRatingScore} />
            <Field
              name="text"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Treść"
              error={touched.text && !!errors.text}
              helperText={touched.text && errors.text}
              multiline
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

const notesFormInitialValues: NoteDTO = {
  player: '',
  match: '',
  positionPlayed: 'CM',
  shirtNo: 10,
  maxRatingScore: 4,
  rating: 1,
  text: '',
};

const validationSchema: yup.ObjectSchema<NoteDTO> = yup
  .object({
    player: yup.string().nullable(),
    match: yup.string().nullable(),
    positionPlayed: yup.mixed<Position>().required(),
    shirtNo: yup
      .number()
      .min(1, 'Numer na koszulce musi być większy lub równy 1')
      .max(99, 'Numer na koszulce musi być mniejszy lub równy 99'),
    maxRatingScore: yup.number().min(2).max(10).required(),
    rating: yup.number().min(1).max(10).required(),
    text: yup.string().required('Wpisz treść notatki'),
  })
  .defined();

function getInitialStateFromCurrent(note: Note): NoteDTO {
  const {
    author,
    createdAt,
    id,
    docNumber,
    percentageRating,
    updatedAt,
    ...rest
  } = note;

  return {
    ...rest,
    player: rest.player?.id,
    match: rest.match?.id,
  };
}
