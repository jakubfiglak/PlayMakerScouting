import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
};

export const FormModal: FC<Props> = ({
  children,
  title,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open onClose={onClose} aria-labelledby="form-dialog-title">
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
