import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { IndividualSkillsStepProps } from '../../../types/reportProps';
// Utils & data
import { commonFields } from '../../../data';

export const IndividualSkillsStep = (props: IndividualSkillsStepProps) => {
  const { onChange } = props;

  return (
    <Grid container spacing={3}>
      {commonFields.map((field) => {
        const { title, radioName, textFieldName } = field;

        return (
          <Grid item xs={12} key={title}>
            <RatingInput
              title={title}
              radioName={radioName}
              ratingValue={props[radioName]}
              textFieldName={textFieldName}
              noteValue={props[textFieldName]}
              onChange={onChange}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
