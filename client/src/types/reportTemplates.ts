import { Rating } from './ratings';

export type ReportTemplate = {
  id: string;
  name: string;
  author: string;
  ratings: Rating[];
  maxRatingScore: number;
};
