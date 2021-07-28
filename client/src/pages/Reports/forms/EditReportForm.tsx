import { Formik, Form } from 'formik';
// MUI components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { SummaryStep } from './SummaryStep';
import { BasicDataStep } from './BasicDataStep';
import { RatingsStep } from './RatingsStep';
import { ReportBasicInfo } from '../../Report/ReportBasicInfo';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Types
import { Report, ReportDTO, Skill } from '../../../types/reports';
import { validationSchema } from './validationSchema';

type Props = {
  report: Report;
  onReset: () => void;
  onSubmit: (data: ReportDTO) => void;
};

export const EditReportForm = ({ report, onReset, onSubmit }: Props) => {
  const classes = useStyles();
  const {
    player,
    match,
    order,
    scout,
    createdAt,
    positionPlayed,
    playerCurrentClub,
  } = report;

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <ReportBasicInfo
            player={player}
            match={match}
            order={order}
            scout={scout}
            positionPlayed={positionPlayed}
            playerCurrentClub={playerCurrentClub}
            createdAt={createdAt}
          />
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
              <CardHeader title="Podsumowanie występu" />
              <CardContent>
                <SummaryStep />
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardHeader title="Statystyki" />
              <CardContent>
                <BasicDataStep />
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
    scout,
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
