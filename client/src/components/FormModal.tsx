import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from '@material-ui/core';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
  open: boolean;
};

export const FormModal: FC<Props> = ({
  children,
  title,
  onClose,
  onSubmit,
  open,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.container }}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Anuluj
        </Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          Dodaj
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
