import { Location, Order } from './common';

export type Division =
  | ''
  | 'Ekstraklasa'
  | 'I liga'
  | 'II liga'
  | 'III liga'
  | 'IV liga'
  | 'Klasa okręgowa'
  | 'Klasa A'
  | 'Klasa B'
  | 'Klasa C';

export type Club = {
  _id: string;
  name: string;
  location: Location;
  division: Division;
};

export type ClubsData = {
  data: Club[];
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

export type ClubsFilterData = {
  name: string;
  division: Division;
  voivodeship: string;
};

export type GetClubs = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: ClubsFilterData,
) => void;

export type State = {
  clubsData: ClubsData;
  current: Club | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getClubs: () => void;
  getClub: (id: string) => void;
  deleteClub: (id: string) => void;
  addClub: (club: Club) => void;
  editClub: (club: Club) => void;
  setCurrent: (club: Club) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Club }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLUBS_ERROR'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS'; payload: ClubsData }
  | { type: 'GET_CLUB_SUCCESS'; payload: Club }
  | { type: 'CREATE_CLUB_SUCCESS' }
  | { type: 'UPDATE_CLUB_SUCCESS' }
  | { type: 'DELETE_CLUB_SUCCESS'; payload: string };
