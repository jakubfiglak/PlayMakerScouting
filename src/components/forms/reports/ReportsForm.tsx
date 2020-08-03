import React from 'react';
// MUI components
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from '@material-ui/core/';
// Custom components
import { OrderStep } from './OrderStep';
import { PlayerStep } from './PlayerStep';
import { MatchStep } from './MatchStep';
// Hooks
import { useStepper, useForm } from '../../../hooks';
// Styles
import { useStyles } from '../styles';

const initialState = {
  order: '',
  player: '',
  match: '',
};

export const ReportsForm = () => {
  const classes = useStyles();
  const [activeStep, handleNext, handleBack, handleReset] = useStepper();
  const [reportData, onInputChange, setReportData] = useForm(initialState);

  const { order, player, match } = reportData;

  const steps = ['Wybierz zlecenie', 'Wybierz zawodnika', 'Wybierz mecz'];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <OrderStep value={order} onChange={onInputChange} />;
      case 1:
        return (
          <PlayerStep value={player} onChange={onInputChange} order={order} />
        );
      case 2:
        return <MatchStep />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <form className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
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
                  >
                    {activeStep === steps.length - 1 ? 'Zapisz' : 'Dalej'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </form>
  );
};
