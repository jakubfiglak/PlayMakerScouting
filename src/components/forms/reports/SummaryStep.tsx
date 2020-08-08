import React from 'react';
// MUI components
import { Grid, TextFieldProps } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';

type SummaryStepProps = {
  summary: string;
  finalRating: 1 | 2 | 3 | 4;
} & TextFieldProps;

export const SummaryStep = ({
  summary,
  finalRating,
  onChange,
}: SummaryStepProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <RatingInput
          title="Podsumowanie występu"
          radioName="finalRating"
          ratingValue={finalRating}
          textFieldName="summary"
          noteValue={summary}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};
