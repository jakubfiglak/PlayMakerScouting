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
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
import { SummaryStep } from './SummaryStep';
// Hooks
import { useStepper, useForm } from '../../../hooks';
import { useReportsState } from '../../../context';
// Types
import { ReportFormData } from '../../../types/reports';
// Styles
import { useStyles } from '../styles';
// Utils & data
import { formatReportObject } from '../../../utils';

const initialState: ReportFormData = {
  order: '',
  player: '',
  match: '',
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  ballReceptionRating: 1,
  ballReceptionNote: '',
  holdPassRating: 1,
  holdPassNote: '',
  gainPassRating: 1,
  gainPassNote: '',
  keyPassRating: 1,
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
  attackRating: 1,
  attackNote: '',
  defenseRating: 1,
  defenseNote: '',
  transitionRating: 1,
  transitionNote: '',
  leading: '',
  neglected: '',
  summary: '',
  finalRating: 1,
};

export const ReportsForm = () => {
  const classes = useStyles();
  const [activeStep, handleNext, handleBack, handleReset] = useStepper();
  const [reportData, onInputChange, setReportData] = useForm(initialState);
  const reportsContext = useReportsState();

  const { addReport } = reportsContext;

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
    attackRating,
    attackNote,
    defenseRating,
    defenseNote,
    transitionRating,
    transitionNote,
    leading,
    neglected,
    summary,
    finalRating,
  } = reportData;

  const steps = [
    'Wybierz zlecenie',
    'Wybierz zawodnika',
    'Wybierz mecz',
    'Dane podstawowe',
    'Ocena umiejętności indywidualnych',
    'Ocena współdziałania z partnerami',
    'Ocena potencjału motorycznego',
    'Podsumowanie występu',
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
            player={player}
          />
        );
      case 5:
        return (
          <TeamplaySkillsStep
            attackRating={attackRating}
            attackNote={attackNote}
            defenseRating={defenseRating}
            defenseNote={defenseNote}
            transitionRating={transitionRating}
            transitionNote={transitionNote}
            onChange={onInputChange}
          />
        );
      case 6:
        return (
          <MotorSkillsStep
            leading={leading}
            neglected={neglected}
            onChange={onInputChange}
          />
        );
      case 7:
        return (
          <SummaryStep
            summary={summary}
            finalRating={finalRating}
            onChange={onInputChange}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formattedReport = formatReportObject(reportData);
    console.log(formattedReport);
    addReport(formattedReport);
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
