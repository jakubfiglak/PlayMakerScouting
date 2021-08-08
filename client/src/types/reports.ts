import { User } from './auth';
import { Player, Position } from './players';
import { Order } from './orders';
import { Club } from './clubs';
import { SkillsCategories } from './ratings';

export type RatingScore = 1 | 2 | 3 | 4;
export type MatchLocation = 'home' | 'away';
export type Competition = 'league' | 'cup' | 'friendly';
export type MatchData = {
  location: MatchLocation;
  against: string;
  competition: Competition;
  date: string;
  result: string;
};

export type ReportStatus = 'in-prep' | 'closed';

export type Skill = {
  category: SkillsCategories;
  name: string;
  shortName: string;
  hasScore: boolean;
  score?: number;
  description: string;
};

export type Report = {
  id: string;
  docNumber: string;
  player: Omit<Player, 'club'>;
  author: Pick<User, 'id' | 'firstName' | 'lastName'>;
  order?: Pick<Order, 'id' | 'docNumber'>;
  match: MatchData;
  playerCurrentClub: Club;
  shirtNo?: number;
  positionPlayed: Position;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  skills: Skill[];
  videoURL?: string;
  videoDescription?: string;
  finalRating: RatingScore;
  summary: string;
  avgRating: number;
  percentageRating: number;
  maxRatingScore: number;
  status: ReportStatus;
  createdAt: string;
};

export type ReportBasicInfo = Pick<
  Report,
  'id' | 'docNumber' | 'player' | 'createdAt'
>;

export type ReportDTO = {
  order?: string;
  player?: string;
  match: MatchData;
  positionPlayed: Position;
  minutesPlayed: number;
  goals: number;
  assists: number;
  shirtNo?: number;
  yellowCards: number;
  redCards: number;
  videoURL?: string;
  videoDescription?: string;
  finalRating: RatingScore;
  maxRatingScore: number;
  summary: string;
  skills: Skill[];
};

export type ReportsFilterData = {
  player: string;
};
