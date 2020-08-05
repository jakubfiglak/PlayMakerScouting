import React from 'react';
// MUI components
import { Grid, TextFieldProps } from '@material-ui/core';
// Custom components
import { RatingInput } from './RatingInput';
// Types
import { RatingScore } from '../../../types/reports';

type IndividualSkillsStepProps = {
  ballReceptionRating: RatingScore;
  ballReceptionNote: string;
  holdPassRating: RatingScore;
  holdPassNote: string;
  gainPassRating: RatingScore;
  gainPassNote: string;
  keyPassRating: RatingScore;
  keyPassNote: string;
  defOneOnOneRating: RatingScore;
  defOneOnOneNote: string;
  airPlayRating: RatingScore;
  airPlayNote: string;
  positioningRating: RatingScore;
  positioningNote: string;
  attOneOnOneRating: RatingScore;
  attOneOnOneNote: string;
  finishingRating: RatingScore;
  finishingNote: string;
} & TextFieldProps;

export const IndividualSkillsStep = ({
  ballReceptionRating,
  ballReceptionNote,
  holdPassRating,
  holdPassNote,
  gainPassRating,
  gainPassNote,
  keyPassRating,
  keyPassNote,
  defOneOnOneNote,
  defOneOnOneRating,
  airPlayRating,
  airPlayNote,
  positioningRating,
  positioningNote,
  attOneOnOneRating,
  attOneOnOneNote,
  finishingRating,
  finishingNote,
  onChange,
}: IndividualSkillsStepProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <RatingInput
          title="Podania utrzymujące"
          radioName="holdPassRating"
          ratingValue={holdPassRating}
          textFieldName="holdPassNote"
          noteValue={holdPassNote}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <RatingInput
          title="Podania zdobywające"
          radioName="gainPassRating"
          ratingValue={gainPassRating}
          textFieldName="gainPassNote"
          noteValue={gainPassNote}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <RatingInput
          title="Podania kluczowe"
          radioName="keyPassRating"
          ratingValue={keyPassRating}
          textFieldName="keyPassNote"
          noteValue={keyPassNote}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <RatingInput
          title="Przyjęcie piłki"
          radioName="ballReceptionRating"
          ratingValue={ballReceptionRating}
          textFieldName="ballReceptionNote"
          noteValue={ballReceptionNote}
          onChange={onChange}
        />
      </Grid>
    </Grid>
  );
};
