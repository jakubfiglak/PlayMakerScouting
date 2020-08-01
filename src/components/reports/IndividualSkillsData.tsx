import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from '@material-ui/core';
// Custom components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rating } from './Rating';
// MUI icons
// Types
import { Report } from '../../types/reports';
// Utils & data
import { getRatingLabel } from '../../utils';

type BasicReportDataProps = {
  report: Report;
};

export const IndividualSkillsData = ({ report }: BasicReportDataProps) => {
  const { individualSkills } = report;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="individual-skills-content"
        id="individual-skills-header"
      >
        <Typography>Ocena umiejętności indywidualnych</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {Object.entries(individualSkills).map(([key, value]) => (
            <Rating
              key={key}
              label={getRatingLabel(key, 'individual')!}
              rating={value!.rating}
              note={value!.note}
            />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
