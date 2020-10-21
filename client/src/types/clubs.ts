import {
  Location,
  Order,
  Address,
  PaginationData,
  Voivodeship,
} from './common';

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

export type ClubsFormData = {
  name: string;
  division: Division | '';
  address: Address;
};

// export type FormattedClubsFormData = {
//   name: string;
//   address: Address;
//   division: Division | '';
// };

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
  setLoading: () => void;
  getClubs: GetClubs;
  getClub: (id: string) => void;
  addClub: (club: ClubsFormData) => void;
  editClub: (id: string, club: ClubsFormData) => void;
  setCurrent: (club: Club) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Club }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLUBS_ERROR'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS'; payload: ClubsData }
  | { type: 'GET_MY_CLUBS_SUCCESS'; payload: ClubsData }
  | { type: 'GET_CLUB_SUCCESS'; payload: Club }
  | { type: 'CREATE_CLUB_SUCCESS' }
  | { type: 'UPDATE_CLUB_SUCCESS' };
