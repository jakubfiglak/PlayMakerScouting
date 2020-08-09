import React from 'react';
// MUI components
import { Grid, Button } from '@material-ui/core';

type MainFormActionsProps = {
  label: string;
  current: boolean;
  onCancelClick: () => void;
  goBack?: () => void;
  activeStep?: number;
  steps?: string[];
};

export const MainFormActions = ({
  label,
  current,
  onCancelClick,
  goBack,
  activeStep,
  steps,
}: MainFormActionsProps) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {current ? `Edytuj ${label}` : `Dodaj ${label}`}
        </Button>
      </Grid>
      {goBack && (
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="default"
            onClick={goBack}
            disabled={activeStep !== steps!.length}
          >
            Wróć do edycji
          </Button>
        </Grid>
      )}
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
