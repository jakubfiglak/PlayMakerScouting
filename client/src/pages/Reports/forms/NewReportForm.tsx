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
import { MatchStep } from './MatchStep';
import { StepActions } from './StepActions';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
import { BottomNav } from '../BottomNav';
import { Loader } from '../../../components/Loader';
// Hooks
import { useStepper } from '../../../hooks';
import { useOrdersState } from '../../../context/orders/useOrdersState';
import { usePlayersState } from '../../../context/players/usePlayersState';
// Types
import { Position } from '../../../types/players';
import { ReportFormData } from '../../../types/reports';
// Utils & data
import { reportsFormInitialValues } from '../../../components/forms/initialValues';

type Props = {
  isOrderOptionDisabled: boolean;
};

export const NewReportForm = ({ isOrderOptionDisabled }: Props) => {
  // const classes = useStyles();
  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const {
    loading: playerLoading,
    getPlayer,
    playerData,
    getPlayersList,
    playersList,
  } = usePlayersState();

  const {
    loading: orderLoading,
    getOrder,
    orderData,
    getOrdersList,
    ordersList,
  } = useOrdersState();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');
  const [position, setPosition] = useState<Position | null>(null);

  const { values, setValues, handleReset } = useFormikContext<ReportFormData>();

  useEffect(() => {
    setValues(reportsFormInitialValues);
    if (reportType === 'custom' && playersList.length === 0) {
      getPlayersList();
    }
    if (reportType === 'order' && ordersList.length === 0) {
      getOrdersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportType]);

  useEffect(() => {
    if (values.order) {
      const order = ordersList.find((ord) => ord._id === values.order);
      if (order) {
        setPosition(order.player.position);
      }
    }
    if (values.player) {
      const player = playersList.find((play) => play._id === values.player);
      if (player) {
        setPosition(player.position);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.order, values.player]);

  const steps = [
    {
      title: 'Rodzaj raportu',
      content: (
        <ReportTypeStep
          reportType={reportType}
          setReportType={setReportType}
          isOrderOptionDisabled={isOrderOptionDisabled}
        />
      ),
    },
    {
      title: reportType === 'custom' ? 'Wybierz zawodnika' : 'Wybierz zlecenie',
      content:
        reportType === 'order' ? (
          <OrderStep ordersData={ordersList} />
        ) : (
          <PlayerStep playersData={playersList} />
        ),
    },
    {
      title: 'Informacje o meczu',
      content: <MatchStep />,
    },
    {
      title: 'Ocena umiejętności indywidualnych',
      content: <IndividualSkillsStep position={position} />,
    },
    {
      title: 'Ocena współdziałania z partnerami',
      content: <TeamplaySkillsStep />,
    },
    {
      title: 'Ocena potencjału motorycznego',
      content: <MotorSkillsStep />,
    },
    {
      title: 'Podsumowanie występu',
      content: <SummaryStep />,
    },
    {
      title: 'Podsumowanie występu',
      content: <SummaryStep />,
    },
    {
      title: 'Statystyki',
      content: <BasicDataStep />,
    },
  ];

  const handleGoBack = () => {
    setActiveStep(steps.length - 1);
  };

  return (
    <Grid container>
      {(playerLoading || orderLoading) && <Loader />}
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
                {steps.map(({ title, content }) => (
                  <Step key={title}>
                    <StepLabel>{title}</StepLabel>
                    <StepContent>
                      <Typography component="div">{content}</Typography>
                      <StepActions
                        activeStep={activeStep}
                        totalSteps={steps.length}
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
                    totalSteps={steps.length}
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
