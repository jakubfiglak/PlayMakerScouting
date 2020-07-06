import { Location } from './common';

export type Club = {
  _id: string;
  name: string;
  location: Location;
  division:
    | 'Ekstraklasa'
    | 'I liga'
    | 'II liga'
    | 'III liga'
    | 'IV liga'
    | 'Klasa okręgowa'
    | 'Klasa A'
    | 'Klasa B'
    | 'Klasa C';
};

export type State = {
  clubsData: {
    data: Club[];
    total: number;
  };
  current: Club | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getClubs: () => void;
  deleteClub: (id: string) => void;
  addClub: (club: Club) => void;
  editClub: (club: Club) => void;
  setCurrent: (club: Club) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT' }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLUBS_ERROR'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS' }
  | { type: 'GET_CLUB_SUCCESS' }
  | { type: 'CREATE_CLUB_SUCCESS' }
  | { type: 'UPDATE_CLUB_SUCCESS' }
  | { type: 'DELETE_CLUB_SUCCESS'; payload: string };
