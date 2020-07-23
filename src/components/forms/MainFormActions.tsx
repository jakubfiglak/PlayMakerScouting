import React from 'react';
import { Grid, Button } from '@material-ui/core';

type MainFormActionsProps = {
  label: string;
  current: boolean;
  onCancelClick: () => void;
};

const MainFormActions = ({
  label,
  current,
  onCancelClick,
}: MainFormActionsProps) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {current ? `Edytuj ${label}` : `Dodaj ${label}`}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={onCancelClick}
        >
          Anuluj zmiany
        </Button>
      </Grid>
    </>
  );
};

export default MainFormActions;
