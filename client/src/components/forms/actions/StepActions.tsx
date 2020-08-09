import React from 'react';
// MUI components
import { Button } from '@material-ui/core';
// Styles
import { useStyles } from '../styles';

type StepActionsProps = {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
  player: string;
  match: string;
};

export const StepActions = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  player,
  match,
}: StepActionsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.actionsContainer}>
      <div>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Wstecz
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={
            (activeStep === 1 && !player) || (activeStep === 2 && !match)
          }
        >
          {activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
        </Button>
      </div>
    </div>
  );
};
