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
import { SummaryStep } from './SummaryStep';
import { SkillsRatingStep } from './SkillsRatingStep';
import { MatchStep } from './MatchStep';
import { StepActions } from './StepActions';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
import { BottomNav } from '../BottomNav';
// Hooks
import { useStepper } from '../../../hooks';
// Types
import { Position, PlayerBasicInfo } from '../../../types/players';
import { OrderBasicInfo } from '../../../types/orders';
import { ReportFormData } from '../../../types/reports';

type Props = {
  isOrderOptionDisabled: boolean;
  playersList: PlayerBasicInfo[];
  ordersList: OrderBasicInfo[];
  onAddPlayerClick: () => void;
};

export const NewReportForm = ({
  isOrderOptionDisabled,
  playersList,
  ordersList,
  onAddPlayerClick,
}: Props) => {
  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');
  const [position, setPosition] = useState<Position | null>(null);

  const { values, handleReset } = useFormikContext<ReportFormData>();

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
          <PlayerStep
            playersData={playersList}
            onAddPlayerClick={onAddPlayerClick}
          />
        ),
    },
    {
      title: 'Informacje o meczu',
      content: <MatchStep />,
    },
    {
      title: 'Notatki/podsumowanie',
      content: <SummaryStep />,
    },
    {
      title: 'Oceny',
      content: <SkillsRatingStep position={position} />,
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
