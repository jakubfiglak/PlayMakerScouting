import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
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
// Types
import { Note, NoteDTO } from '../../types/notes';
import { PlayerBasicInfo, Position } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';
import { PositionPlayedSelect } from './PositionPlayedSelect';

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
                handleReset();
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
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

type GetPlayersMatchesArgs = {
  playerId: string;
  players: PlayerBasicInfo[];
  matches: MatchBasicInfo[];
};

function getPlayersMatches({
  playerId,
  players,
  matches,
}: GetPlayersMatchesArgs) {
  const selectedPlayer = players.find((player) => player.id === playerId);

  if (selectedPlayer) {
    return matches.filter(
      (match) =>
        match.homeTeam.id === selectedPlayer.club.id ||
        match.awayTeam.id === selectedPlayer.club.id,
    );
  }

  return [];
}

type GetMatchesPlayers = {
  matchId: string;
  matches: MatchBasicInfo[];
  players: PlayerBasicInfo[];
};

function getMatchesPlayers({ matchId, matches, players }: GetMatchesPlayers) {
  const selectedMatch = matches.find((match) => match.id === matchId);

  if (selectedMatch) {
    return players.filter(
      (player) =>
        player.club.id === selectedMatch.homeTeam.id ||
        player.club.id === selectedMatch.awayTeam.id,
    );
  }

  return [];
}
