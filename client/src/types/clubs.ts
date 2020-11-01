import { Location, Order, Address, PaginationData } from './common';

export type Division =
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
  address: Address;
};

export type ClubWithFlag = Club & { isFavorite: boolean };

export type ClubsFormData = {
  name: string;
  division: Division | '';
  address: Address;
};

export type ClubsData = {
  docs: Club[];
} & PaginationData;

export type ClubsFilterData = {
  name: string;
  division: Division | '';
  voivodeship: string;
};

export type GetClubs = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: ClubsFilterData,
  my?: boolean,
) => void;

export type State = {
  clubsData: ClubsData;
  myClubsData: ClubsData;
  current: Club | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  getClubs: GetClubs;
  getClub: (id: string) => void;
  addClub: (club: ClubsFormData) => void;
  editClub: (id: string, club: ClubsFormData) => void;
  setCurrent: (club: Club) => void;
  clearCurrent: () => void;
  addClubToFavorites: (id: string) => void;
  removeClubFromFavorites: (id: string) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Club }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'CLUBS_ERROR'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS'; payload: ClubsData }
  | { type: 'GET_MY_CLUBS_SUCCESS'; payload: ClubsData }
  | { type: 'GET_CLUB_SUCCESS'; payload: Club }
  | {
      type: 'ADD_CLUB_TO_FAVORITES_SUCCESS';
      payload: { club: Club; message: string };
    }
  | {
      type: 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS';
      payload: { id: string; message: string };
    }
  | { type: 'CREATE_CLUB_SUCCESS'; payload: { club: Club; message: string } }
  | { type: 'UPDATE_CLUB_SUCCESS'; payload: { club: Club; message: string } };
