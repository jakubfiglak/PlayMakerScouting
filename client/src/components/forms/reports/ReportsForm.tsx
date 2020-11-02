import React, { SyntheticEvent } from 'react';
import { Formik, Form, Field, FormikValues } from 'formik';
// MUI components
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Grid,
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
import { StepActions, MainFormActions } from '../actions';
import { BottomNav } from './BottomNav';
// Hooks
import { useStepper, useForm } from '../../../hooks';
import { useReportsState } from '../../../context';
// Types
import { ReportFormData } from '../../../types/reports';
// Styles
import { useStyles } from '../styles';
// Utils & data
import { reportsFormInitialValues } from '../initialValues';

export const ReportsForm = () => {
  const classes = useStyles();
  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const { addReport, current, editReport } = useReportsState();

  // const initialState = current
  //   ? getInitialStateFromCurrent(current)
  //   : reportFormInitialState;

  const steps = [
    'Wybierz zlecenie',
    'Wybierz zawodnika',
    'Wybierz mecz',
    'Ocena umiejętności indywidualnych',
    'Ocena współdziałania z partnerami',
    'Ocena potencjału motorycznego',
    'Podsumowanie występu',
    'Statystyki',
  ];

  const getStepContent = (step: number, values: ReportFormData) => {
    switch (step) {
      case 0:
        return <OrderStep current={current} />;
      case 1:
        return <PlayerStep order={values.order} current={current} />;
      case 2:
        return <MatchStep player={values.player} current={current} />;
      case 3:
        return <IndividualSkillsStep player={values.player} />;
      case 4:
        return <TeamplaySkillsStep />;
      case 5:
        return <MotorSkillsStep />;
      case 6:
        return <SummaryStep />;
      case 7:
        return <BasicDataStep />;
      default:
        return 'Unknown step';
    }
  };

  // const handleSubmit = (e: SyntheticEvent) => {
  //   e.preventDefault();
  //   const formattedReport = formatReportObject(reportData);

  //   if (current) {
  //     editReport(current._id, formattedReport);
  //   } else {
  //     addReport(formattedReport);
  //   }
  // };

  const handleGoBack = () => {
    setActiveStep(steps.length - 1);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          {current
            ? `Edycja raportu nr ${current._id}`
            : 'Tworzenie nowego raportu'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={reportsFormInitialValues}
          onSubmit={(data) => console.log(data)}
        >
          {({ handleReset, touched, errors, values }) => (
            <Form>
              <Grid container className={classes.root}>
                <Grid item xs={12}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                          <Typography component="div">
                            {getStepContent(index, values)}
                          </Typography>
                          <StepActions
                            activeStep={activeStep}
                            steps={steps}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            player={values.player}
                            match={values.match}
                          />
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
                {activeStep === steps.length && (
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <MainFormActions
                        label="raport"
                        current={!!current}
                        onCancelClick={() => {
                          handleReset();
                          resetStepper();
                        }}
                        goBack={handleGoBack}
                        activeStep={activeStep}
                        steps={steps}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
      <BottomNav activeStep={activeStep} setActiveStep={setActiveStep} />
    </Grid>
  );
};
