import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { Position } from '../../../types/players';
// Utils & data
import { getIndSkillsFields } from '../../../utils/getIndSkillsFields';

type Props = {
  position: Position | null;
};

const commonIndSkillsFields = [
  {
    title: 'Podania',
    namespace: 'passing',
    placeholder: 'Opisz podania kluczowe, otwierające i prostopadłe',
  },
  {
    title: 'Przyjęcie piłki',
    namespace: 'ballReception',
  },
];

export const IndividualSkillsStep = ({ position }: Props) => {
  let specificIndSkillsFields: {
    title: string;
    namespace: string;
    placeholder?: string;
  }[] = [];

  if (position) {
    specificIndSkillsFields = getIndSkillsFields(position);
  }

  const skillsFields = [...commonIndSkillsFields, ...specificIndSkillsFields];

  return (
    <Grid container spacing={3}>
      {skillsFields.map(({ title, namespace, placeholder }) => (
        <Grid item xs={12} key={title}>
          <RatingInput
            title={title}
            namespace={`individualSkills.${namespace}`}
            placeholder={placeholder}
          />
        </Grid>
      ))}
    </Grid>
  );
};
