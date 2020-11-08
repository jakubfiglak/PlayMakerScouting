import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { Position } from '../../../types/players';
// Utils & data
import { commonIndSkillsFields } from '../../../data';
import { getIndSkillsFields } from '../../../utils';

type Props = {
  position?: Position;
};

export const IndividualSkillsStep = ({ position }: Props) => {
  let specificIndSkillsFields: { title: string; namespace: string }[] = [];

  if (position) {
    specificIndSkillsFields = getIndSkillsFields(position);
  }

  const skillsFields = [...commonIndSkillsFields, ...specificIndSkillsFields];

  return (
    <Grid container spacing={3}>
      {skillsFields.map(({ title, namespace }) => (
        <Grid item xs={12} key={title}>
          <RatingInput
            title={title}
            namespace={`individualSkills.${namespace}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};
