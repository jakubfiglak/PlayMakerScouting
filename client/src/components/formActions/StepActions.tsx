import React from 'react';
// MUI components
import { Button } from '@material-ui/core';
// Styles
import { useStyles } from './styles';

type Props = {
  activeStep: number;
  steps: string[];
  handleBack: () => void;
  handleNext: () => void;
  isNextButtonDisabled: boolean;
};

export const StepActions = ({
  activeStep,
  steps,
  handleBack,
  handleNext,
  isNextButtonDisabled,
}: Props) => {
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
          disabled={isNextButtonDisabled}
        >
          {activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
        </Button>
      </div>
    </div>
  );
};
