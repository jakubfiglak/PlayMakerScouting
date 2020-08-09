import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { OnChangeFn } from '../../../types/common';

type SummaryStepProps = {
  summary: string;
  finalRating: 1 | 2 | 3 | 4;
  onChange: OnChangeFn;
};

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
