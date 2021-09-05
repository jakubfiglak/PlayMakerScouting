import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MatchesCombo } from '../../components/selects/MatchesCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Hooks
import { useAccountInfo } from '../../hooks/auth';
import { useAlertsState } from '../../context/alerts/useAlertsState';
// Types
import { Note, NoteDTO } from '../../types/notes';
import { PlayerBasicInfo } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';
import { PositionPlayedSelect } from './PositionPlayedSelect';
// Utils & data
import {
  getInitialStateFromCurrent,
  validationSchema,
  getMatchesPlayers,
  getPlayersMatches,
} from './utils';

type Props = {
  playersData: PlayerBasicInfo[];
  matchesData: MatchBasicInfo[];
  current: Note | null;
  onSubmit: (data: NoteDTO) => void;
  onCancelClick?: () => void;
  fullWidth?: boolean;
};

export const NotesForm = ({
  playersData,
  matchesData,
  current,
  onSubmit,
  onCancelClick,
  fullWidth,
}: Props) => {
  const { data: account } = useAccountInfo();
  const { setAlert } = useAlertsState();

  const notesFormInitialValues: NoteDTO = {
    player: '',
    match: account?.match?.id || '',
    positionPlayed: 'CM',
    shirtNo: 10,
    maxRatingScore: 4,
    rating: 1,
    text: '',
  };

  return (
    <Formik
      initialValues={
        current ? getInitialStateFromCurrent(current) : notesFormInitialValues
      }
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
        localStorage.removeItem('note');
      }}
    >
      {({ errors, touched, values, handleReset }) => (
        <Form>
          <FormContainer fullWidth={fullWidth}>
            <FormControl variant="outlined" fullWidth>
              <PlayersCombo
                playersData={
                  values.match
                    ? getMatchesPlayers({
                        matchId: values.match,
                        matches: matchesData,
                        players: playersData,
                      })
                    : playersData
                }
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
                matchesData={
                  values.player
                    ? getPlayersMatches({
                        playerId: values.player,
                        players: playersData,
                        matches: matchesData,
                      })
                    : matchesData
                }
                name="match"
                label="Mecz"
              />
            </FormControl>
            <PositionPlayedSelect players={playersData} />
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
              label="notatkę"
              isEditState={!!current}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick();
                }
                setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
                handleReset();
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
