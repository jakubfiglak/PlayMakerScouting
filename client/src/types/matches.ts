import { Order } from './common';

export type Competition = '' | 'league' | 'cup' | 'friendly';

export type Match = {
  _id: string;
  homeTeam: {
    _id: string;
    name: string;
  };
  awayTeam: {
    _id: string;
    name: string;
  };
  competition: Competition;
  date: string;
};

export type MatchesData = {
  data: Match[];
  total: number;
  pagination: {
    prev?: {
      page: number;
      limit: number;
    };
    next?: {
      page: number;
      limit: number;
    };
  };
};

export type MatchesFormData = {
  homeTeam: string;
  awayTeam: string;
  competition: Competition;
  date: string;
};

export type MatchesFilterData = {
  homeTeam: string;
  awayTeam: string;
  competition: Competition;
  dateFrom: string;
  dateTo: string;
};

export type State = {
  matchesData: MatchesData;
  current: Match | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getMatches: (filters: MatchesFilterData) => void;
  getMatch: (id: string) => void;
  deleteMatch: (id: string) => void;
  addMatch: (match: MatchesFormData) => void;
  editMatch: (id: string, club: MatchesFormData) => void;
  setCurrent: (match: Match) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Match }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'MATCHES_ERROR'; payload: string }
  | { type: 'GET_MATCHES_SUCCESS'; payload: MatchesData }
  | { type: 'GET_MATCH_SUCCESS'; payload: Match }
  | { type: 'CREATE_MATCH_SUCCESS' }
  | { type: 'UPDATE_MATCH_SUCCESS' }
  | { type: 'DELETE_MATCH_SUCCESS'; payload: string };
