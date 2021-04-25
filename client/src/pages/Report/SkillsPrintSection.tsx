import React from 'react';
// MUI components
import { Typography, makeStyles } from '@material-ui/core';
// Custom components
import { NewReportSkills } from './NewReportSkills';
// Types
import { SkillsCategories, Skill } from '../../types/reports';
// Utils & data
import { getLabel } from '../../utils/getLabel';

type Props = {
  category: SkillsCategories;
  skills: Skill[];
  maxRatingScore: number;
};

export const SkillsPrintSection = ({
  category,
  skills,
  maxRatingScore,
}: Props) => {
  const classes = useStyles();

  return (
    <section>
      <Typography variant="h6" align="center" className={classes.heading}>
        {getLabel(category)}
      </Typography>
      <NewReportSkills
        skills={skills}
        printeable
        maxRatingScore={maxRatingScore}
      />
    </section>
  );
};

const useStyles = makeStyles(() => ({
  heading: {
    fontSize: 14,
    fontWeight: 700,
  },
}));
