import { Club } from './clubs';
import { Competition } from './reports';

export type Match = {
  id: string;
  homeTeam: Pick<Club, 'id' | 'name' | 'division'>;
  awayTeam: Pick<Club, 'id' | 'name' | 'division'>;
  author: string;
  competition: Competition;
  date: string;
  result?: string;
  videoURL?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  notesCount: number;
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
