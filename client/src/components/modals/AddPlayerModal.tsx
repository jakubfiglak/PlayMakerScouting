// MUI components
import {
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
// Custom components
import { PlayersForm } from '../../pages/Players/PlayersForm';
import { Loader } from '../Loader';
// Hooks
import { useCreatePlayer } from '../../hooks/players';
import { useClubsList } from '../../hooks/clubs';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddPlayerModal = ({ open, onClose }: Props) => {
  const classes = useStyles();

  const {
    mutate: createPlayer,
    isLoading: createPlayerLoading,
  } = useCreatePlayer();
  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const isLoading = createPlayerLoading || clubsLoading;

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.container }}
      >
        <DialogTitle id="form-dialog-title">Utwórz zawodnika</DialogTitle>
        <DialogContent>
          <PlayersForm
            clubsData={clubs || []}
            current={null}
            onSubmit={createPlayer}
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

const useStyles = makeStyles(() => ({
  container: {
    width: '95%',
  },
}));
