import { PaginationData } from './common';
import { Match } from './matches';

export type IndSkillsField = {
  title: string;
  radioName: keyof IndSkillsFormData;
  textFieldName: keyof IndSkillsFormData;
};

export type TeamplaySkillsField = {
  title: string;
  radioName: keyof TeamplaySkillsFormData;
  textFieldName: keyof TeamplaySkillsFormData;
};

export type RatingScore = 0 | 1 | 2 | 3 | 4;

type Rating = {
  rating: RatingScore;
  note: string;
};

export type IndividualSkills = {
  ballReception: Rating;
  holdPass: Rating;
  gainPass: Rating;
  keyPass: Rating;
  defOneOnOne: Rating;
  airPlay: Rating;
  positioning: Rating;
  attOneOnOne: Rating;
  finishing: Rating;
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
  finalRating: 1 | 2 | 3 | 4;
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
    name: string;
    surname: string;
  };
  order?: string;
  individualAvg: number;
  teamplayAvg: number;
  motorAvg: number;
  avgRating: number;
  createdAt: string;
} & ReportData;

export type IndSkillsFormData = {
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
};

export type TeamplaySkillsFormData = {
  attackRating: RatingScore;
  attackNote: string;
  defenseRating: RatingScore;
  defenseNote: string;
  transitionRating: RatingScore;
  transitionNote: string;
};

export type MotorSkillsFormData = {
  leading: string;
  neglected: string;
};

type CommonFormData = {
  order?: string;
  player: string;
  match: string;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  finalRating: 1 | 2 | 3 | 4;
  summary: string;
};

export type ReportFormData = CommonFormData &
  IndSkillsFormData &
  TeamplaySkillsFormData &
  MotorSkillsFormData;

export type FormattedReportFormData = {
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
  current: Report | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getReports: () => void;
  getMyReports: () => void;
  getReport: (id: string) => void;
  deleteReport: (id: string) => void;
  addReport: (report: FormattedReportFormData) => void;
  editReport: (id: string, report: FormattedReportFormData) => void;
  setCurrent: (report: Report) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Report }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'REPORTS_ERROR'; payload: string }
  | { type: 'GET_REPORTS_SUCCESS'; payload: ReportsData }
  | { type: 'GET_REPORT_SUCCESS'; payload: Report }
  | { type: 'GET_MY_REPORTS_SUCCESS'; payload: ReportsData }
  | { type: 'CREATE_REPORT_SUCCESS' }
  | { type: 'UPDATE_REPORT_SUCCESS' }
  | { type: 'DELETE_REPORT_SUCCESS'; payload: string };
