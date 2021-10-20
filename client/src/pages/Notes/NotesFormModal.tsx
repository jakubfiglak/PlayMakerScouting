import { useState } from 'react';
// MUI components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { NotesForm } from './NotesForm';
import { Loader } from '../../components/Loader';
// Hooks
import { useAccountInfo } from '../../hooks/auth';
import {
  useCreateNote,
  useUpdateNote,
  useMatchesNotesList,
} from '../../hooks/notes';
// Types
import { PlayerBasicInfo } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';
// Utils & data
import { getNoteLabelById } from '../../components/selects/utils';

type Props = {
  onClose: () => void;
  open: boolean;
  playersData: PlayerBasicInfo[];
  matchesData: MatchBasicInfo[];
};

export const NotesFormModal = ({
  onClose,
  open,
  matchesData,
  playersData,
}: Props) => {
  const classes = useStyles();
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');

  const { data: account, isLoading: accountLoading } = useAccountInfo();

  const { data: notes, isLoading: notesLoading } = useMatchesNotesList(
    account?.match?.id || '',
  );

  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote();
  const { mutate: updateNote, isLoading: updateNoteLoading } = useUpdateNote(
    selectedNoteId,
  );

  const isLoading =
    accountLoading || notesLoading || createNoteLoading || updateNoteLoading;

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.container }}
      >
        <DialogTitle id="form-dialog-title">
          {account?.match
            ? `Szybka notatka (mecz ${account.match.homeTeam.name} - ${account.match.awayTeam.name})`
            : 'Szybka notatka'}
        </DialogTitle>
        <DialogContent>
          {account?.match && notes ? (
            <>
              <FormControl
                variant="outlined"
                fullWidth
                className={classes.noteSelect}
              >
                <InputLabel id="note-select-label">
                  Notatka do edycji
                </InputLabel>
                <Select
                  labelId="note-select-label"
                  id="note-select"
                  value={selectedNoteId}
                  onChange={(e) => setSelectedNoteId(e.target.value as string)}
                  label="Notatka do edycji"
                >
                  <MenuItem value="">
                    <em>Brak</em>
                  </MenuItem>
                  {notes.map((note) => (
                    <MenuItem value={note.id} key={note.id}>
                      {getNoteLabelById(note.id, notes)}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  Wybierz notatkę z danego meczu, którą chciałbyś edytować
                </FormHelperText>
              </FormControl>
              <Typography variant="h6" gutterBottom align="center">
                Dane notatki
              </Typography>
            </>
          ) : null}
          <NotesForm
            current={notes?.find((note) => note.id === selectedNoteId) || null}
            matchesData={matchesData}
            playersData={playersData}
            onSubmit={selectedNoteId ? updateNote : createNote}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  noteSelect: {
    marginBottom: theme.spacing(2),
  },
  container: {
    width: '95%',
  },
}));
