import React, { SyntheticEvent } from 'react';
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
import { BasicDataStep } from './BasicDataStep';
import { IndividualSkillsStep } from './IndividualSkillsStep';
// Hooks
import { useStepper, useForm } from '../../../hooks';
// Types
import { ReportFormData } from '../../../types/reports';
// Styles
import { useStyles } from '../styles';

const initialState: ReportFormData = {
  order: '',
  player: '',
  match: '',
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  ballReceptionRating: 0,
  ballReceptionNote: '',
  holdPassRating: 0,
  holdPassNote: '',
  gainPassRating: 0,
  gainPassNote: '',
  keyPassRating: 0,
  keyPassNote: '',
  defOneOnOneRating: 0,
  defOneOnOneNote: '',
  airPlayRating: 0,
  airPlayNote: '',
  positioningRating: 0,
  positioningNote: '',
  attOneOnOneRating: 0,
  attOneOnOneNote: '',
  finishingRating: 0,
  finishingNote: '',
};

export const ReportsForm = () => {
  const classes = useStyles();
  const [activeStep, handleNext, handleBack, handleReset] = useStepper();
  const [reportData, onInputChange, setReportData] = useForm(initialState);

  const {
    order,
    player,
    match,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    ballReceptionRating,
    ballReceptionNote,
    holdPassRating,
    holdPassNote,
    gainPassRating,
    gainPassNote,
    keyPassRating,
    keyPassNote,
    defOneOnOneRating,
    defOneOnOneNote,
    airPlayRating,
    airPlayNote,
    positioningRating,
    positioningNote,
    attOneOnOneRating,
    attOneOnOneNote,
    finishingRating,
    finishingNote,
  } = reportData;

  const steps = [
    'Wybierz zlecenie',
    'Wybierz zawodnika',
    'Wybierz mecz',
    'Dane podstawowe',
    'Ocena umiejętności indywidualnych',
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <OrderStep value={order} onChange={onInputChange} />;
      case 1:
        return (
          <PlayerStep value={player} onChange={onInputChange} order={order} />
        );
      case 2:
        return (
          <MatchStep value={match} onChange={onInputChange} player={player} />
        );
      case 3:
        return (
          <BasicDataStep
            minutesPlayed={minutesPlayed}
            goals={goals}
            assists={assists}
            yellowCards={yellowCards}
            redCards={redCards}
            onChange={onInputChange}
          />
        );
      case 4:
        return (
          <IndividualSkillsStep
            ballReceptionRating={ballReceptionRating}
            ballReceptionNote={ballReceptionNote}
            holdPassRating={holdPassRating}
            holdPassNote={holdPassNote}
            gainPassRating={gainPassRating}
            gainPassNote={gainPassNote}
            keyPassRating={keyPassRating}
            keyPassNote={keyPassNote}
            defOneOnOneNote={defOneOnOneNote}
            defOneOnOneRating={defOneOnOneRating}
            airPlayRating={airPlayRating}
            airPlayNote={airPlayNote}
            positioningRating={positioningRating}
            positioningNote={positioningNote}
            attOneOnOneRating={attOneOnOneRating}
            attOneOnOneNote={attOneOnOneNote}
            finishingRating={finishingRating}
            finishingNote={finishingNote}
            onChange={onInputChange}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(reportData);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
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
          <Button type="submit" className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </form>
  );
};
