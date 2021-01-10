import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';

const teamplaySkillsFields = [
  {
    title: 'Udział w ataku',
    namespace: 'attack',
  },
  {
    title: 'Praca w obronie',
    namespace: 'defense',
  },
  {
    title: 'Fazy przejściowe',
    namespace: 'transition',
  },
];

export const TeamplaySkillsStep = () => {
  return (
    <>
      <Grid container spacing={3}>
        {teamplaySkillsFields.map(({ title, namespace }) => (
          <Grid item xs={12} key={title}>
            <RatingInput
              title={title}
              namespace={`teamplaySkills.${namespace}`}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
