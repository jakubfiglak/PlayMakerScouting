import { Formik, Form } from 'formik';
// MUI components
import { Card, CardContent, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { SummaryStep } from './SummaryStep';
import { MatchStep } from './MatchStep';
import { StatsStep } from './StatsStep';
import { RatingsStep } from './RatingsStep';
import { ExtraPlayerInfo } from './ExtraPlayerInfo';
import { ReportCard } from '../../Report/ReportCard';
import { ReportBasicInfo } from '../../Report/ReportBasicInfo';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Hooks
import { useAlertsState } from '../../../context/alerts/useAlertsState';
// Types
import { Report, ReportDTO, Skill } from '../../../types/reports';
import { validationSchema } from './validationSchema';

type Props = {
  report: Report;
  onReset?: () => void;
  onSubmit: (data: ReportDTO) => void;
};

export const EditReportForm = ({ report, onReset, onSubmit }: Props) => {
  const classes = useStyles();
  const { setAlert } = useAlertsState();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <ReportBasicInfo report={report} />
        </CardContent>
      </Card>
      <Formik
        initialValues={getInitialStateFromCurrent(report)}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          onSubmit(data);
        }}
      >
        {({ handleReset }) => (
          <Form>
            <ReportCard title="Szczegóły dot. zawodnika">
              <ExtraPlayerInfo />
            </ReportCard>
            <ReportCard title="Informacje o meczu">
              <MatchStep />
            </ReportCard>
            <ReportCard title="Podsumowanie występu">
              <SummaryStep />
            </ReportCard>
            <ReportCard title="Oceny">
              <RatingsStep
                ratings={mapSkillsToRatingType(report.skills)}
                maxRatingScore={report.maxRatingScore}
              />
            </ReportCard>
            <ReportCard title="Statystyki">
              <StatsStep />
            </ReportCard>
            <div className={classes.container}>
              <MainFormActions
                label="raport"
                isEditState
                onCancelClick={() => {
                  if (onReset) {
                    onReset();
                  }
                  setAlert({
                    msg: 'Zmiany zostały anulowane',
                    type: 'warning',
                  });
                  handleReset();
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

function getInitialStateFromCurrent(report: Report): ReportDTO {
  const {
    id,
    docNumber,
    playerCurrentClub,
    avgRating,
    status,
    createdAt,
    author,
    ...rest
  } = report;

  const matchDate = new Date(rest.match.date);

  return {
    ...rest,
    player: rest.player.id,
    order: rest.order?.id,
    match: {
      ...rest.match,
      date: matchDate.toISOString().slice(0, 16),
    },
  };
}

function mapSkillsToRatingType(skills: Skill[]) {
  return skills.map((skill) => {
    const { name, category, score } = skill;
    return { name, category, hasScore: !!score };
  });
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  container: {
    margin: theme.spacing(2, 'auto'),

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));
