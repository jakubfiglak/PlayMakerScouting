import { ReactNode, useState } from 'react';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
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
import { StatsStep } from './StatsStep';
import { SummaryStep } from './SummaryStep';
import { MatchStep } from './MatchStep';
import { StepActions } from './StepActions';
import { RatingsStep } from './RatingsStep';
import { BottomNav } from '../BottomNav';
import { Loader } from '../../../components/Loader';
import { ReportTemplatesSelect } from '../../../components/selects/ReportTemplatesSelect';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Hooks
import { useStepper } from '../../../hooks/useStepper';
import { useReportTemplates } from '../../../hooks/reportTemplates';
import { useDraftsState } from '../../../context/drafts/useDraftsState';
// Types
import { PlayerBasicInfo } from '../../../types/players';
import { OrderBasicInfo } from '../../../types/orders';
import { ReportDTO, Skill } from '../../../types/reports';
import { Rating } from '../../../types/ratings';
import { Note } from '../../../types/notes';
// Utils & data
import { validationSchema } from './validationSchema';
import { useSettingsState } from '../../../context/settings/useSettingsState';
import { formatDateObject } from '../../../utils/dates';

type TStep = {
  title: string;
  content: ReactNode;
  errorKeys?: string[];
};

type Props = {
  isOrderOptionDisabled: boolean;
  playersList: PlayerBasicInfo[];
  ordersList: OrderBasicInfo[];
  onAddPlayerClick: () => void;
  onSubmit: (data: ReportDTO) => void;
  onReset: () => void;
  activeOrderId: string;
};

export const CreateReportForm = ({
  isOrderOptionDisabled,
  playersList,
  ordersList,
  onAddPlayerClick,
  onSubmit,
  onReset,
  activeOrderId,
}: Props) => {
  const classes = useStyles();

  const { activeStep, handleNext, handleBack, setActiveStep } = useStepper();

  const { defaultReportTemplateId } = useSettingsState();
  const { note, clearDrafts } = useDraftsState();

  const [reportType, setReportType] = useState<'order' | 'custom'>(
    activeOrderId ? 'order' : 'custom',
  );
  const [selectedReportTemplateId, setSelectedReportTemplateId] = useState(
    defaultReportTemplateId,
  );

  const {
    data: reportTemplates,
    isLoading: reportTemplatesLoading,
  } = useReportTemplates();

  const selectedReportTemplate = reportTemplates?.find(
    (template) => template.id === selectedReportTemplateId,
  );

  const steps: TStep[] = [
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
          isPlayerOptionDisabled={!!activeOrderId}
        />
      ),
    },
    {
      title:
        reportType === 'custom'
          ? 'Informacje o zawodniku'
          : 'Zlecenie i informacje o zawodniku',
      content:
        reportType === 'order' ? (
          <OrderStep ordersData={ordersList} />
        ) : (
          <PlayerStep
            playersData={playersList}
            onAddPlayerClick={onAddPlayerClick}
          />
        ),
      errorKeys: ['player', 'order'],
    },
    {
      title: 'Informacje o meczu',
      content: <MatchStep />,
      errorKeys: ['videoURL'],
    },
    {
      title: 'Notatki/podsumowanie',
      content: <SummaryStep />,
      errorKeys: ['summary'],
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
      content: <StatsStep />,
    },
  ];

  const initialValues = note
    ? getInitialStateFromNote(note)
    : reportFormInitialValues;

  return (
    <>
      {reportTemplatesLoading && <Loader />}
      <Formik
        initialValues={{
          ...initialValues,
          order: activeOrderId,
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
          clearDrafts();
        }}
      >
        {({ handleReset, values, errors, touched }) => (
          <Form>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={classes.root}
            >
              {steps.map((step) => (
                <Step key={step.title}>
                  <StepLabel error={getStepError({ errors, touched, step })}>
                    {step.title}
                  </StepLabel>
                  <StepContent>
                    <div className={classes.content}>{step.content}</div>
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
            <div className={classes.container}>
              <MainFormActions
                label="raport"
                isEditState={false}
                onCancelClick={() => {
                  handleReset();
                  onReset();
                  clearDrafts();
                }}
              />
            </div>
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
  container: {
    margin: theme.spacing(2, 'auto'),

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
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

type GetStepErrorArgs = {
  errors: FormikErrors<ReportDTO>;
  touched: FormikTouched<ReportDTO>;
  step: TStep;
};

function getStepError({ errors, touched, step }: GetStepErrorArgs) {
  const stepErrors: string[] = [];
  step.errorKeys?.forEach((key) => {
    if (touched[key as keyof ReportDTO] && errors[key as keyof ReportDTO]) {
      stepErrors.push(key);
    }
  });
  return !!stepErrors.length;
}

const reportFormInitialValues: Omit<ReportDTO, 'skills'> = {
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

function getInitialStateFromNote(note: Note): Omit<ReportDTO, 'skills'> {
  const isPlayerFromHomeTeam =
    note.player?.club?.id === note.match?.homeTeam.id;
  const matchDate = note.match?.date ? new Date(note.match.date) : '';

  return {
    ...reportFormInitialValues,
    player: note.player?.id,
    positionPlayed: note.positionPlayed || 'CM',
    match: {
      location: isPlayerFromHomeTeam ? 'home' : 'away',
      against:
        (isPlayerFromHomeTeam
          ? note.match?.awayTeam.name
          : note.match?.homeTeam.name) || '',
      competition: note.match?.competition || 'league',
      date: matchDate ? `${formatDateObject(matchDate)}T00:00` : dateString,
      result: note.match?.result || '',
    },
    summary: note.text,
    shirtNo: note.shirtNo,
  };
}
