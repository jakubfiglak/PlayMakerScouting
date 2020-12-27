import React from 'react';
// MUI components
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  AccordionSummaryProps,
} from '@material-ui/core';
// Custom components
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Rating } from './Rating';
// MUI icons
// Types
import { IndividualSkills, TeamplaySkills } from '../../types/reports';
// Utils & data
import { getRatingLabel } from '../../utils';

type BasicReportDataProps = {
  skills: IndividualSkills | TeamplaySkills;
  title: string;
} & AccordionSummaryProps;

export const SkillsAccordion = ({
  skills,
  id,
  title,
}: BasicReportDataProps) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id={id}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          {Object.entries(skills).map(
            ([key, value]) =>
              value && (
                <Rating
                  key={key}
                  label={getRatingLabel(key)}
                  rating={value.rating}
                  note={value.note}
                />
              ),
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
