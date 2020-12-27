import React, { useState, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';
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
import { BasicDataStep } from './BasicDataStep';
import { IndividualSkillsStep } from './IndividualSkillsStep';
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
import { SummaryStep } from './SummaryStep';
import { StepActions } from '../../../components/formActions/StepActions';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
import { BottomNav } from '../BottomNav';
import { Loader } from '../../../components/Loader';
// Hooks
import { useStepper } from '../../../hooks';
import { useAuthState } from '../../../context/auth/useAuthState';
import { useOrdersState } from '../../../context/orders/useOrdersState';
import { usePlayersState } from '../../../context/players/usePlayersState';
import { useSimplifiedDataState } from '../../../context/simplifiedData/useSimplifiedDataState';
// Types
import { ReportFormData } from '../../../types/reports';
// Utils & data
import { reportsFormInitialValues } from '../../../components/forms/initialValues';

export const NewReportForm = () => {
  // const classes = useStyles();
  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const { user } = useAuthState();

  const { loading: playerLoading, getPlayer, playerData } = usePlayersState();

  const { loading: orderLoading, getOrder, orderData } = useOrdersState();

  const {
    loading: simpleDataLoading,
    getPlayers,
    getMyOrders,
    playersData,
    myOrdersData,
  } = useSimplifiedDataState();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');

  const { values, setValues, handleReset } = useFormikContext<ReportFormData>();

  useEffect(() => {
    setValues(reportsFormInitialValues);
    if (reportType === 'custom' && playersData.length === 0) {
      getPlayers();
    }
    if (reportType === 'order' && myOrdersData.length === 0) {
      getMyOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType]);

  useEffect(() => {
    if (values.player) {
      getPlayer(values.player);
      // getPlayerMatches(values.player);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.player]);

  useEffect(() => {
    if (values.order) {
      getOrder(values.order);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.order]);

  useEffect(() => {
    if (orderData) {
      getPlayer(orderData.player._id);
      // getPlayerMatches(orderData.player._id);
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
            isOrderOptionDisabled={user?.role === 'scout'}
          />
        );
      case 1:
        if (reportType === 'order') {
          return <OrderStep ordersData={myOrdersData} />;
        }
        return <PlayerStep playersData={playersData} />;
      case 2:
        return <div />;
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

  const handleGoBack = () => {
    setActiveStep(steps.length - 1);
  };

  return (
    <Grid container>
      {(simpleDataLoading || playerLoading || orderLoading) && <Loader />}
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Tworzenie nowego raportu
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Form>
          <Grid container>
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
                        isNextButtonDisabled={
                          (activeStep === 1 &&
                            !values.player &&
                            !values.order) ||
                          (activeStep === 2 && !values.match)
                        }
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
                    isEditState={false}
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
      </Grid>
      <BottomNav activeStep={activeStep} setActiveStep={setActiveStep} />
    </Grid>
  );
};
