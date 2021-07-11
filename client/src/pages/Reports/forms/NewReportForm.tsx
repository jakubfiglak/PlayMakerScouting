import React, { useState } from 'react';
import { Formik, Form } from 'formik';
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
import { MatchStep } from './MatchStep';
import { StepActions } from './StepActions';
import { RatingsStep } from './RatingsStep';
import { BottomNav } from '../BottomNav';
import { ReportTemplatesSelect } from '../../../components/selects/ReportTemplatesSelect';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Hooks
import { useStepper } from '../../../hooks/useStepper';
import { useReportTemplates } from '../../../hooks/reportTemplates';
// Types
import { PlayerBasicInfo } from '../../../types/players';
import { OrderBasicInfo } from '../../../types/orders';
import { ReportFormData, Skill } from '../../../types/reports';
import { Rating } from '../../../types/ratings';
// Utils & data
import { validationSchema } from './validationSchema';
import { useSettingsState } from '../../../context/settings/useSettingsState';

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

  const { defaultReportTemplateId } = useSettingsState();

  const [reportType, setReportType] = useState<'order' | 'custom'>('custom');
  const [selectedReportTemplateId, setSelectedReportTemplateId] = useState(
    defaultReportTemplateId,
  );

  const { data: reportTemplates } = useReportTemplates();

  const selectedReportTemplate = reportTemplates?.find(
    (template) => template.id === selectedReportTemplateId,
  );

  const steps = [
    {
      title: 'Szablon raportu',
      content: reportTemplates ? (
        <ReportTemplatesSelect
          reportTemplates={reportTemplates}
          value={selectedReportTemplateId}
          onChange={setSelectedReportTemplateId}
        />
      ) : (
        <p>Wybierz szablon raportu</p>
      ),
    },
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
      content: selectedReportTemplate && (
        <RatingsStep
          ratings={mapRatingsToRatingType(selectedReportTemplate.ratings)}
          maxRatingScore={selectedReportTemplate.maxRatingScore}
        />
      ),
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
          maxRatingScore: selectedReportTemplate
            ? selectedReportTemplate.maxRatingScore
            : 4,
          skills: selectedReportTemplate
            ? getInitialSkills(selectedReportTemplate.ratings)
            : [],
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(data, { resetForm }) => {
          onSubmit(data);
          resetForm();
        }}
      >
        {({ handleReset, values }) => (
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
                      isNextButtonDisabled={
                        (activeStep === 2 && !values.player && !values.order) ||
                        (activeStep === 4 && !values.summary)
                      }
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

function mapRatingsToRatingType(ratings: Rating[]) {
  return ratings.map((rating) => {
    const { name, category, score } = rating;
    return { name, category, hasScore: score };
  });
}

const initialValues: Omit<ReportFormData, 'skills'> = {
  order: '',
  player: '',
  positionPlayed: 'CM',
  match: {
    location: 'home',
    against: '',
    competition: 'league',
    date: dateString,
    result: '',
  },
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  summary: '',
  finalRating: 1,
  maxRatingScore: 4,
};
