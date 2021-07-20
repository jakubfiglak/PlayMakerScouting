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
  const isLastStep = activeStep === totalSteps - 1;

  return (
    <div>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        className={classes.button}
      >
        Wstecz
      </Button>
      {isLastStep ? null : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
          disabled={isNextButtonDisabled}
        >
          Dalej
        </Button>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
