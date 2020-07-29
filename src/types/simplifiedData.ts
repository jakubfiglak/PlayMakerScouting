export type PlayerData = {
  _id: string;
  firstName: string;
  lastName: string;
  club: {
    _id: string;
    name: string;
  };
};

export type ClubData = {
  _id: string;
  name: string;
};

export type State = {
  playersData: PlayerData[];
  clubsData: ClubData[];
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: () => void;
  getClubs: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayerData[] }
  | { type: 'GET_PLAYERS_FAIL'; payload: string }
  | { type: 'GET_CLUBS_SUCCESS'; payload: ClubData[] }
  | { type: 'GET_CLUBS_FAIL'; payload: string };
