import { Club } from './clubs';
import { Competition } from './reports';

export type Match = {
  id: string;
  homeTeam: Pick<Club, 'id' | 'name'>;
  awayTeam: Pick<Club, 'id' | 'name'>;
  author: string;
  competition: Competition;
  date: string;
  result?: string;
  videoURL?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MatchBasicInfo = Pick<
  Match,
  'id' | 'homeTeam' | 'awayTeam' | 'competition' | 'date'
>;

export type MatchDTO = Pick<
  Match,
  'competition' | 'date' | 'result' | 'videoURL'
> & { homeTeam: string; awayTeam: string };

export type MatchesFilterData = {
  club: string;
  afterDate: string;
  beforeDate: string;
};
