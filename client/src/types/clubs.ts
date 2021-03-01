import { SortingOrder, PaginatedData, Voivodeship } from './common';

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
  division: Division;
  voivodeship: Voivodeship | 'Zagranica';
  lnpID?: string;
};

export type ClubBasicInfo = Pick<Club, '_id' | 'name'>;

export type ClubsFormData = Omit<Club, '_id' | 'division' | 'voivodeship'> & {
  voivodeship: Voivodeship | 'Zagranica' | '';
  division: Division | '';
};

export type ClubsFilterData = {
  name: string;
  division: Division | '';
  voivodeship: string;
};

export type GrantAccessFormData = {
  user: string;
  club: string;
};

export type GetClubs = (
  page: number,
  limit: number,
  sort: string,
  order: SortingOrder,
  filters: ClubsFilterData,
  my?: boolean,
) => void;

export type State = {
  clubsData: PaginatedData<Club>;
  clubsList: ClubBasicInfo[];
  current: Club | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  getClubs: GetClubs;
  getClubsList: () => void;
  getClub: (id: string) => void;
  addClub: (club: ClubsFormData) => void;
  editClub: (id: string, club: ClubsFormData) => void;
  grantAccess: (data: GrantAccessFormData) => void;
  setCurrent: (club: Club) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Club }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLUBS_ERROR'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS'; payload: PaginatedData<Club> }
  | { type: 'GET_CLUBS_LIST_SUCCESS'; payload: ClubBasicInfo[] }
  | { type: 'GET_CLUB_SUCCESS'; payload: Club }
  | { type: 'CREATE_CLUB_SUCCESS'; payload: { club: Club; message: string } }
  | { type: 'UPDATE_CLUB_SUCCESS'; payload: { club: Club; message: string } }
  | { type: 'GRANT_ACCESS_SUCCESS'; payload: { message: string } };
