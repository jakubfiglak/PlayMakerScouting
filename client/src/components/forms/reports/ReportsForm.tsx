import React, { useState, useEffect, useRef, RefObject } from 'react';
import { Formik, Form, Field, FormikValues, FormikProps } from 'formik';
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
import { ReportTypeStep } from './ReportTypeStep';
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
import { Loader } from '../../common';
// Hooks
import { useStepper, useForm } from '../../../hooks';
import {
  useOrdersState,
  useReportsState,
  useSimplifiedDataState,
  usePlayersState,
  useAuthState,
} from '../../../context';
// Types
import { ReportFormData } from '../../../types/reports';
// Styles
import { useStyles } from '../styles';
// Utils & data
import { reportsFormInitialValues } from '../initialValues';

// TODO: perhaps move the formik component one level up to ReportsContent to avoid using form refs and
// use useFormikContext() hook instead

export const ReportsForm = () => {
  const classes = useStyles();
  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const { user } = useAuthState();

  const { addReport, current, editReport, loading } = useReportsState();

  const {
    loading: playerLoading,
    getPlayer,
    getPlayerMatches,
    playerData,
    playerMatches,
  } = usePlayersState();

  const { loading: orderLoading, getOrder, orderData } = useOrdersState();

  const {
    loading: simpleDataLoading,
    getPlayers,
    getMyOrders,
    playersData,
    myOrdersData,
  } = useSimplifiedDataState();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');

  const formRef = useRef() as RefObject<FormikProps<ReportFormData>>;

  // const initialState = current
  //   ? getInitialStateFromCurrent(current)
  //   : reportFormInitialState;

  useEffect(() => {
    formRef.current?.setValues(reportsFormInitialValues);
    if (reportType === 'custom' && playersData.length === 0) {
      getPlayers();
    }
    if (reportType === 'order' && myOrdersData.length === 0) {
      getMyOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType]);

  useEffect(() => {
    if (formRef.current?.values.player) {
      getPlayer(formRef.current.values.player);
      getPlayerMatches(formRef.current.values.player);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef.current?.values.player]);

  useEffect(() => {
    if (formRef.current?.values.order) {
      getOrder(formRef.current?.values.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRef.current?.values.order]);

  useEffect(() => {
    if (orderData) {
      getPlayer(orderData.player._id);
      getPlayerMatches(orderData.player._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderData]);

  const steps = [
    'Rodzaj raportu',
    reportType === 'custom' ? 'Wybierz zawodnika' : 'Wybierz zlecenie',
    'Wybierz mecz',
    'Ocena umiejętności indywidualnych',
    'Ocena współdziałania z partnerami',
    'Ocena potencjału motorycznego',
    'Podsumowanie występu',
    'Statystyki',
  ];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ReportTypeStep
            reportType={reportType}
            setReportType={setReportType}
            userRole={user?.role}
          />
        );
      case 1:
        if (reportType === 'order') {
          return <OrderStep current={current} ordersData={myOrdersData} />;
        }
        return <PlayerStep current={current} playersData={playersData} />;
      case 2:
        return <MatchStep current={current} matches={playerMatches} />;
      case 3:
        return <IndividualSkillsStep position={playerData?.position} />;
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
      {(loading || simpleDataLoading || playerLoading) && <Loader />}
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
          innerRef={formRef}
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
                            {getStepContent(index)}
                          </Typography>
                          <StepActions
                            activeStep={activeStep}
                            steps={steps}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            player={values.player}
                            match={values.match}
                            order={values.order}
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
