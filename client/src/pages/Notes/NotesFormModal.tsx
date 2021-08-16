import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';
import { NotesForm } from './NotesForm';
import { PlayerBasicInfo } from '../../types/players';
import { MatchBasicInfo } from '../../types/matches';
import { NoteDTO } from '../../types/notes';

type Props = {
  onClose: () => void;
  open: boolean;
  playersData: PlayerBasicInfo[];
  matchesData: MatchBasicInfo[];
  onSubmit: (data: NoteDTO) => void;
};

export const NotesFormModal = ({
  onClose,
  onSubmit,
  open,
  matchesData,
  playersData,
}: Props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.container }}
    >
      <DialogTitle id="form-dialog-title">Dodaj notatkę</DialogTitle>
      <DialogContent>
        <NotesForm
          current={null}
          matchesData={matchesData}
          playersData={playersData}
          onSubmit={onSubmit}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Zamknij
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    width: '95%',
  },
}));
