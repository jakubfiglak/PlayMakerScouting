import { TextFieldProps } from '@material-ui/core';
import { RatingScore } from './reports';

export type IndividualSkillsStepProps = {
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
