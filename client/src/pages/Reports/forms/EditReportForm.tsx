import React from 'react';
import { Formik, Form } from 'formik';
// MUI components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
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
import { Report, ReportFormData, Skill } from '../../../types/reports';
import { validationSchema } from './validationSchema';

type Props = {
  report: Report;
  onReset: () => void;
  onSubmit: (id: string, data: ReportFormData) => void;
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
        onSubmit={(data, { resetForm }) => {
          onSubmit(report.id, data);
          console.log(data);
        }}
      >
        {({ errors, touched, handleReset, values }) => (
          <Form>
            <RatingsStep
              ratings={mapSkillsToRatingType(report.skills)}
              maxRatingScore={report.maxRatingScore}
            />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="summary-content"
                id="summary"
              >
                <Typography>Podsumowanie występu</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SummaryStep />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="stats-content"
                id="stats"
              >
                <Typography>Statystyki</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <BasicDataStep />
              </AccordionDetails>
            </Accordion>
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

function getInitialStateFromCurrent(report: Report): ReportFormData {
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
