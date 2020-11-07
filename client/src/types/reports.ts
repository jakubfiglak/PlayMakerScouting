import { PaginationData } from './common';
import { Match } from './matches';

export type RatingScore = 1 | 2 | 3 | 4;

export type Rating = {
  rating: RatingScore;
  note: string;
};

export type IndividualSkills = {
  holdPass: Rating;
  gainPass: Rating;
  keyPass: Rating;
  ballReception: Rating;
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

type ReportData = {
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  individualSkills: IndividualSkills;
  teamplaySkills: TeamplaySkills;
  motorSkills: MotorSkills;
  finalRating: RatingScore;
  summary: string;
};

export type Report = {
  _id: string;
  docNumber: string;
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  match: Match;
  scout: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  order?: {
    _id: string;
    docNumber: string;
  };
  individualAvg: number;
  teamplayAvg: number;
  motorAvg: number;
  avgRating: number;
  createdAt: string;
} & ReportData;

type CommonFormData = {
  order?: string;
  player: string;
  match: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  finalRating: RatingScore;
  summary: string;
};

export type ReportFormData = {
  individualSkills: IndividualSkills;
  teamplaySkills: TeamplaySkills;
  motorSkills: MotorSkills;
} & CommonFormData;

export type ReportsData = {
  docs: Report[];
} & PaginationData;

export type State = {
  reportsData: ReportsData;
  myReportsData: ReportsData;
  reportData: Report | null;
  current: Report | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  getReports: () => void;
  getMyReports: () => void;
  getReport: (id: string) => void;
  deleteReport: (id: string) => void;
  addReport: (report: ReportFormData) => void;
  editReport: (id: string, report: ReportFormData) => void;
  setCurrent: (report: Report) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'SET_CURRENT'; payload: Report }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'REPORTS_ERROR'; payload: string }
  | { type: 'GET_REPORTS_SUCCESS'; payload: ReportsData }
  | { type: 'GET_REPORT_SUCCESS'; payload: Report }
  | { type: 'GET_MY_REPORTS_SUCCESS'; payload: ReportsData }
  | {
      type: 'CREATE_REPORT_SUCCESS';
      payload: { report: Report; message: string };
    }
  | {
      type: 'UPDATE_REPORT_SUCCESS';
      payload: { report: Report; message: string };
    }
  | { type: 'DELETE_REPORT_SUCCESS'; payload: { id: string; message: string } };
