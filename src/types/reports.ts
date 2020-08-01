import { Match } from './matches';

type Rating = {
  rating: 1 | 2 | 3 | 4;
  note: string;
};

type IndividualSkills = {
  ballReception: Rating;
  holdPass: Rating;
  gainPass: Rating;
  keyPass: Rating;
  defOneOnOne?: Rating;
  airPlay?: Rating;
  positioning?: Rating;
  attOneOnOne?: Rating;
  finishing?: Rating;
};

type TeamplaySkills = {
  attack: Rating;
  defense: Rating;
  transition: Rating;
};

type MotorSkills = {
  leading: Rating;
  neglected: Rating;
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
  player: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  match: Match;
  user: {
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

export type ReportFormData = {
  player: string;
  match: string;
  user: string;
  order?: string;
} & ReportData;

export type State = {
  reportsData: Report[];
  myReportsData: Report[];
  current: Report | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getReports: () => void;
  getMyReports: () => void;
  getReport: (id: string) => void;
  deleteReport: (id: string) => void;
  addReport: (report: ReportFormData) => void;
  setCurrent: (report: Report) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Report }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'REPORTS_ERROR'; payload: string }
  | { type: 'GET_REPORTS_SUCCESS'; payload: Report[] }
  | { type: 'GET_REPORT_SUCCESS'; payload: Report }
  | { type: 'GET_MY_REPORTS_SUCCESS'; payload: Report[] }
  | { type: 'CREATE_REPORT_SUCCESS' }
  | { type: 'DELETE_REPORT_SUCCESS'; payload: string };
