import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { TeamplaySkillsFormData, RatingScore } from '../../../types/reports';
import { OnChangeFn } from '../../../types/common';
// Utils & data
import { teamplaySkillsFields } from '../../../data';

type TeamplaySkillsStepProps = {
  onChange: OnChangeFn;
} & TeamplaySkillsFormData;

export const TeamplaySkillsStep = (props: TeamplaySkillsStepProps) => {
  const { onChange } = props;

  return (
    <>
      <Grid container spacing={3}>
        {teamplaySkillsFields.map((field) => {
          const { title, radioName, textFieldName } = field;

          return (
            <Grid item xs={12} key={title}>
              <RatingInput
                title={title}
                radioName={radioName}
                ratingValue={props[radioName] as RatingScore}
                textFieldName={textFieldName}
                noteValue={props[textFieldName] as string}
                onChange={onChange}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
