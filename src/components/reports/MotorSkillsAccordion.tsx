import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@material-ui/core';
// MUI icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Types
import { MotorSkills } from '../../types/reports';

type MotorSkillsAccordionProps = {
  skills: MotorSkills;
};

export const MotorSkillsAccordion = ({ skills }: MotorSkillsAccordionProps) => {
  const { leading, neglected } = skills;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="motor-skills-content"
        id="motor-skills-header"
      >
        <Typography>Ocena potencjału motorycznego</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              <strong>Cechy wiodące: </strong>
              {leading}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Cechy zaniedbane: </strong>
              {neglected}
            </Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
