import { Order } from './common';

export type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  club: {
    _id: string;
    name: string;
  };
  position: 'GK' | 'D' | 'M' | 'F';
  dateOfBirth: string;
  height: number;
  weight: number;
  footed: 'L' | 'R';
};

export type PlayersData = {
  data: Player[];
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

export type State = {
  playersData: PlayersData;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: (page: number, limit: number, sort: string, order: Order) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayersData }
  | { type: 'GET_PLAYERS_FAIL'; payload: string }
  | { type: 'GET_PLAYER_SUCCESS'; payload: Player }
  | { type: 'GET_PLAYER_FAIL'; payload: string }
  | { type: 'CREATE_PLAYER_SUCCESS' }
  | { type: 'CREATE_PLAYER_FAIL' }
  | { type: 'UPDATE_PLAYER_SUCCESS' }
  | { type: 'UPDATE_PLAYER_FAIL' }
  | { type: 'DELETE_PLAYER_SUCCESS' }
  | { type: 'DELETE_PLAYER_FAIL' };
