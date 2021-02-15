import React from 'react';
import { Form, useFormikContext } from 'formik';
// MUI components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { IndividualSkillsStep } from './IndividualSkillsStep';
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
import { SummaryStep } from './SummaryStep';
import { BasicDataStep } from './BasicDataStep';
import { ReportBasicInfo } from '../../Report/ReportBasicInfo';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Types
import { Report } from '../../../types/reports';

type Props = {
  report: Report;
  onReset: () => void;
};

export const EditReportForm = ({ report, onReset }: Props) => {
  const classes = useStyles();
  const { player, match, order, scout, createdAt } = report;

  const { handleReset } = useFormikContext();

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <ReportBasicInfo
            player={player}
            match={match}
            order={order}
            scout={scout}
            createdAt={createdAt}
          />
        </CardContent>
      </Card>
      <Form>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="individual-skills-content"
            id="individual-skills"
          >
            <Typography>Ocena umiejętności indywidualnych</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <IndividualSkillsStep position={player.position} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="teamplay-skills-content"
            id="teamplay-skills"
          >
            <Typography>Ocena współdziałania z partnerami</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TeamplaySkillsStep />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="motor-skills-content"
            id="motor-skills"
          >
            <Typography>Ocena potencjału motorycznego</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <MotorSkillsStep />
          </AccordionDetails>
        </Accordion>
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
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  container: {
    margin: theme.spacing(2, 0),

    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
  },
}));
