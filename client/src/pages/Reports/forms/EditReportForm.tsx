import React from 'react';
import { Form, useFormikContext } from 'formik';
// MUI components
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Custom components
import { IndividualSkillsStep } from './IndividualSkillsStep';
import { TeamplaySkillsStep } from './TeamplaySkillsStep';
import { MotorSkillsStep } from './MotorSkillsStep';
import { SummaryStep } from './SummaryStep';
import { BasicDataStep } from './BasicDataStep';
import { MainFormActions } from '../../../components/formActions/MainFormActions';
// Types
import { Report } from '../../../types/reports';
// Utils & data
import { getLabel } from '../../../utils/getLabel';
import { formatDate } from '../../../utils/dates';

type Props = {
  report: Report;
};

export const EditReportForm = ({ report }: Props) => {
  const { _id, player, match, order, scout, createdAt } = report;

  const { handleReset } = useFormikContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">
          Edycja raportu nr {_id}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Zawodnik: </strong>
          {`${player.firstName} ${player.lastName}, ${getLabel(
            player.position,
          )} (${player.club.name})`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <div>hello</div>
      </Grid>
      {order && (
        <Grid item xs={12}>
          <Typography>
            <strong>Nr zlecenia: </strong>
            {order}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography>
          <strong>Scout: </strong>
          {`${scout.firstName} ${scout.lastName}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <strong>Data utworzenia: </strong>
          {`${formatDate(createdAt, true)}`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <MainFormActions
                label="raport"
                isEditState
                onCancelClick={() => {
                  handleReset();
                }}
              />
            </Grid>
          </Grid>
        </Form>
      </Grid>
    </Grid>
  );
};
