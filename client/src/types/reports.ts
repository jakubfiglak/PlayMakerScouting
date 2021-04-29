import { PaginatedData, SortingOrder } from './common';
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
};

export type Rating = {
  rating: RatingScore;
  note: string;
};

export type IndividualSkills = {
  ballReception: Rating;
  passing: Rating;
  defOneOnOne?: Rating;
  airPlay?: Rating;
  positioning?: Rating;
  attOneOnOne?: Rating;
  finishing?: Rating;
};

export type TeamplaySkills = {
  attack: Rating;
  defense: Rating;
  transition: Rating;
};

export type MotorSkills = {
  leading: string;
  neglected: string;
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
  player: Player;
  scout: Pick<User, 'id' | 'firstName' | 'lastName'>;
  order?: Pick<Order, 'id' | 'docNumber'>;
  match: MatchData;
  playerCurrentClub: Pick<Club, 'id' | 'name' | 'division'>;
  positionPlayed: Position;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  individualSkills: IndividualSkills;
  teamplaySkills: TeamplaySkills;
  motorSkills: MotorSkills;
  skills: Skill[];
  finalRating: RatingScore;
  summary: string;
  avgRating: number;
  maxRatingScore: number;
  status: ReportStatus;
  createdAt: string;
};

type CommonFormData = {
  order?: string;
  player: string;
  match: MatchData;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  finalRating: RatingScore;
  summary: string;
  skills: any[];
};

export type ReportFormData = {
  individualSkills: IndividualSkills;
  teamplaySkills: TeamplaySkills;
  motorSkills: MotorSkills;
} & CommonFormData;

export type ReportsFilterData = {
  player: string;
};

export type GetReports = (
  page: number,
  limit: number,
  sort: string,
  order: SortingOrder,
  filters: ReportsFilterData,
) => void;

export type State = {
  reportsData: PaginatedData<Report>;
  reportData: Report | null;
  current: Report | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  getReports: GetReports;
  getReport: (id: string) => void;
  deleteReport: (id: string) => void;
  addReport: (report: ReportFormData) => void;
  editReport: (id: string, report: ReportFormData) => void;
  setCurrent: (report: Report) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Report }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'REPORTS_ERROR'; payload: string }
  | { type: 'GET_REPORTS_SUCCESS'; payload: PaginatedData<Report> }
  | { type: 'GET_REPORT_SUCCESS'; payload: Report }
  | {
      type: 'CREATE_REPORT_SUCCESS';
      payload: { report: Report; message: string };
    }
  | {
      type: 'UPDATE_REPORT_SUCCESS';
      payload: { report: Report; message: string };
    }
  | { type: 'DELETE_REPORT_SUCCESS'; payload: { id: string; message: string } };
