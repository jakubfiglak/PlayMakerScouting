import { Order } from './common';

type PlayerCommonTypes = {
  firstName: string;
  lastName: string;
  position: 'GK' | 'D' | 'M' | 'F';
  dateOfBirth: string;
  height: number;
  weight: number;
  footed: 'L' | 'R';
};

export type Player = PlayerCommonTypes & {
  _id: string;
  club: {
    _id: string;
    name: string;
  };
};

export type PlayersFormData = PlayerCommonTypes & {
  _id?: string;
  club: string;
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

export type GetPlayers = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: PlayersFilterData,
) => void;

export type State = {
  playersData: PlayersData;
  current: PlayersFormData | null;
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: GetPlayers;
  deletePlayer: (id: string) => void;
  addPlayer: (player: PlayersFormData) => void;
  editPlayer: (player: PlayersFormData) => void;
  setCurrent: (player: Player) => void;
  clearCurrent: () => void;
};

export type PlayersFilterData = {
  name: string;
  club: string;
  position: string;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Player }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'PLAYERS_ERROR'; payload: string }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayersData }
  | { type: 'GET_PLAYER_SUCCESS'; payload: Player }
  | { type: 'CREATE_PLAYER_SUCCESS' }
  | { type: 'UPDATE_PLAYER_SUCCESS' }
  | { type: 'DELETE_PLAYER_SUCCESS'; payload: string };
