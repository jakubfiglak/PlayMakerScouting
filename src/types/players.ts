import { Order } from './common';

type Player = {
  firstName: string;
  lastName: string;
  position: 'GK' | 'D' | 'M' | 'F';
  dateOfBirth: string;
  height: number;
  weight: number;
  footed: 'L' | 'R';
};

export type DatabasePlayer = Player & {
  _id: string;
  club: {
    _id: string;
    name: string;
  };
};

export type NewPlayer = Player & {
  _id?: string;
  club: string;
};

export type PlayersData = {
  data: DatabasePlayer[];
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

export type GetPlayers = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: PlayersFilterData,
) => void;

export type State = {
  playersData: PlayersData;
  current: NewPlayer | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: GetPlayers;
  deletePlayer: (id: string) => void;
  addPlayer: (player: NewPlayer) => void;
  editPlayer: (player: NewPlayer) => void;
  setCurrent: (player: NewPlayer) => void;
  clearCurrent: () => void;
};

export type PlayersFilterData = {
  name: string;
  club: string;
  position: string;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: NewPlayer }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'PLAYERS_ERROR'; payload: string }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayersData }
  | { type: 'GET_PLAYER_SUCCESS'; payload: Player }
  | { type: 'CREATE_PLAYER_SUCCESS' }
  | { type: 'UPDATE_PLAYER_SUCCESS' }
  | { type: 'DELETE_PLAYER_SUCCESS'; payload: string };
