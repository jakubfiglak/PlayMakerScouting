import { Rating } from './ratings';

export type ReportTemplate = {
  id: string;
  name: string;
  author: string;
  ratings: Rating[];
  maxRatingScore: number;
  private: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ReportTemplateDTO = Pick<
  ReportTemplate,
  'name' | 'maxRatingScore'
> & { ratings: string[] };
