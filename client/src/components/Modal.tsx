import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogProps,
} from '@material-ui/core';

type ModalProps = {
  message: string;
  handleAccept: () => void;
  handleClose: () => void;
} & DialogProps;

export const Modal = ({
  message,
  open,
  handleAccept,
  handleClose,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleAccept} autoFocus>
          Tak
        </Button>
        <Button color="primary" onClick={handleClose}>
          Nie
        </Button>
      </DialogActions>
    </Dialog>
  );
};
