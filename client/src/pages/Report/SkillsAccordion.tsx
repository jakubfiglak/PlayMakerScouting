import React from 'react';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { NewReportSkills } from './NewReportSkills';
import { Skill, SkillsCategories } from '../../types/reports';
import { getLabel } from '../../utils/getLabel';

type Props = {
  category: SkillsCategories;
  skills: Skill[];
  maxRatingScore: number;
};

export const SkillsAccordion = ({
  category,
  skills,
  maxRatingScore,
}: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        id={`${category}-skills-header`}
      >
        <Typography>{getLabel(category)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NewReportSkills skills={skills} maxRatingScore={maxRatingScore} />
      </AccordionDetails>
    </Accordion>
  );
};
