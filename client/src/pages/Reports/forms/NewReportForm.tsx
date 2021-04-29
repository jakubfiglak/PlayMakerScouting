import React, { useState, useEffect } from 'react';
import { Formik, Form, useFormikContext } from 'formik';
// MUI components
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  makeStyles,
  Theme,
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
import { BottomNav } from '../BottomNav';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Hooks
import { useStepper } from '../../../hooks/useStepper';
import { useReportTemplates } from '../../../operations/queries/useReportTemplates';
// Types
import { Position, PlayerBasicInfo } from '../../../types/players';
import { OrderBasicInfo } from '../../../types/orders';
import { ReportFormData, Skill } from '../../../types/reports';
import { ReportTemplate } from '../../../types/reportTemplates';
import { ReportTemplateStep } from './ReportTemplateStep';
import { NewRatingsStep } from './NewRatingsStep';
import { validationSchema } from './validationSchema';
import { Rating } from '../../../types/ratings';

type Props = {
  isOrderOptionDisabled: boolean;
  playersList: PlayerBasicInfo[];
  ordersList: OrderBasicInfo[];
  onAddPlayerClick: () => void;
  onSubmit: (data: ReportFormData) => void;
};

export const NewReportForm = ({
  isOrderOptionDisabled,
  playersList,
  ordersList,
  onAddPlayerClick,
  onSubmit,
}: Props) => {
  const classes = useStyles();

  const [
    activeStep,
    handleNext,
    handleBack,
    resetStepper,
    setActiveStep,
  ] = useStepper();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');
  const [
    selectedReportTemplateIdx,
    setSelectedReportTemplateIdx,
  ] = useState<number>(0);

  const { data: reportTemplates } = useReportTemplates();

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
      title: 'Szablon raportu',
      content: reportTemplates && (
        <ReportTemplateStep
          selectedIndex={selectedReportTemplateIdx}
          reportTemplates={reportTemplates}
          setSelectedIndex={setSelectedReportTemplateIdx}
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
      title: 'Nowe oceny',
      content: reportTemplates && (
        <NewRatingsStep
          ratings={reportTemplates[selectedReportTemplateIdx].ratings}
          maxRatingScore={
            reportTemplates[selectedReportTemplateIdx].maxRatingScore
          }
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
      title: 'Statystyki',
      content: <BasicDataStep />,
    },
  ];

  const handleGoBack = () => {
    setActiveStep(steps.length - 1);
  };

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
          skills: reportTemplates
            ? getInitialSkills(
                reportTemplates[selectedReportTemplateIdx].ratings,
              )
            : [],
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          // onSubmit(data);
          // resetForm();
          console.log(data);
        }}
      >
        {({ errors, touched, handleReset, values }) => (
          <Form>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.root}
            >
              {steps.map(({ title, content }) => (
                <Step key={title}>
                  <StepLabel>{title}</StepLabel>
                  <StepContent>
                    <div className={classes.content}>{content}</div>
                    <StepActions
                      activeStep={activeStep}
                      totalSteps={steps.length}
                      handleBack={handleBack}
                      handleNext={handleNext}
                      isNextButtonDisabled={false}
                      // isNextButtonDisabled={
                      //   (activeStep === 1 && !values.player && !values.order) ||
                      //   (activeStep === 2 && !values.match)
                      // }
                    />
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
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
            )}
          </Form>
        )}
      </Formik>
      <BottomNav activeStep={activeStep} setActiveStep={setActiveStep} />
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1),
    },
  },
  content: {
    marginTop: theme.spacing(1),
  },
}));

const date = new Date(Date.now());
const dateString = date.toISOString().slice(0, 16);

function getInitialSkills(ratings: Rating[]): Skill[] {
  return ratings.map((rating) => ({
    category: rating.category,
    name: rating.name,
    shortName: rating.shortName,
    hasScore: rating.score,
    score: rating.score ? 1 : undefined,
    description: '',
  }));
}

const initialValues: Omit<ReportFormData, 'skills'> = {
  order: '',
  player: '',
  match: {
    location: 'home',
    against: '',
    competition: 'league',
    date: dateString,
  },
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  individualSkills: {
    ballReception: {
      rating: 1,
      note: '',
    },
    passing: {
      rating: 1,
      note: '',
    },
    defOneOnOne: {
      rating: 1,
      note: '',
    },
    airPlay: {
      rating: 1,
      note: '',
    },
    positioning: {
      rating: 1,
      note: '',
    },
    attOneOnOne: {
      rating: 1,
      note: '',
    },
    finishing: {
      rating: 1,
      note: '',
    },
  },
  teamplaySkills: {
    attack: {
      rating: 1,
      note: '',
    },
    defense: {
      rating: 1,
      note: '',
    },
    transition: {
      rating: 1,
      note: '',
    },
  },
  motorSkills: {
    leading: '',
    neglected: '',
  },
  summary: '',
  finalRating: 1,
};
