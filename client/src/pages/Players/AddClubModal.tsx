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
import { Loader } from '../../components/Loader';
import { ClubsForm } from '../Clubs/ClubsForm';
// Hooks
import { useCreateClub } from '../../hooks/clubs';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddClubModal = ({ onClose, open }: Props) => {
  const classes = useStyles();

  const { mutate: createClub, isLoading } = useCreateClub();

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.container }}
      >
        <DialogTitle id="form-dialog-title">Utwórz klub</DialogTitle>
        <DialogContent>
          <ClubsForm current={null} onSubmit={createClub} fullWidth />
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
