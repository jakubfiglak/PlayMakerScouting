import React from 'react';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';

type Props = {
  activeStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  isNextButtonDisabled: boolean;
};

export const StepActions = ({
  activeStep,
  totalSteps,
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
          {activeStep === totalSteps - 1 ? 'Zapisz' : 'Dalej'}
        </Button>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
