import { Formik, Form } from 'formik';
// MUI components
import {
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { SummaryStep } from './SummaryStep';
import { StatsStep } from './StatsStep';
import { RatingsStep } from './RatingsStep';
import { ExtraPlayerInfo } from './ExtraPlayerInfo';
import { ReportBasicInfo } from '../../Report/ReportBasicInfo';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Types
import { Report, ReportDTO, Skill } from '../../../types/reports';
import { validationSchema } from './validationSchema';
import { MatchStep } from './MatchStep';

type Props = {
  report: Report;
  onReset: () => void;
  onSubmit: (data: ReportDTO) => void;
};

export const EditReportForm = ({ report, onReset, onSubmit }: Props) => {
  const classes = useStyles();

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
            <Card className={classes.card}>
              <CardHeader title="Szczegóły dot. zawodnika" />
              <CardContent>
                <ExtraPlayerInfo />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader title="Informacje o meczu" />
              <CardContent>
                <MatchStep />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader title="Podsumowanie występu" />
              <CardContent>
                <SummaryStep />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader title="Oceny" />
              <CardContent>
                <RatingsStep
                  ratings={mapSkillsToRatingType(report.skills)}
                  maxRatingScore={report.maxRatingScore}
                />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader title="Statystyki" />
              <CardContent>
                <StatsStep />
              </CardContent>
            </Card>
            <div className={classes.container}>
              <MainFormActions
                label="raport"
                isEditState
                onCancelClick={() => {
                  handleReset();
                  onReset();
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

  return {
    ...rest,
    player: rest.player.id,
    order: rest.order?.id,
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
