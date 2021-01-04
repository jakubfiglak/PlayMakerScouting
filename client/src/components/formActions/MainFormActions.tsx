import React from 'react';
// MUI components
import { Grid, Button } from '@material-ui/core';

type MainFormActionsProps = {
  label: string;
  isEditState: boolean;
  onCancelClick: () => void;
  goBack?: () => void;
  activeStep?: number;
  totalSteps?: number;
};

export const MainFormActions = ({
  label,
  isEditState,
  onCancelClick,
  goBack,
  activeStep,
  totalSteps,
}: MainFormActionsProps) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Button type="submit" fullWidth variant="contained" color="primary">
          {isEditState ? `Edytuj ${label}` : `Dodaj ${label}`}
        </Button>
      </Grid>
      {goBack && totalSteps && (
        <Grid item xs={12} sm={4}>
          <Button
            fullWidth
            variant="contained"
            color="default"
            onClick={goBack}
            disabled={activeStep !== totalSteps}
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
