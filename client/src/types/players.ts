import { Order, PaginationData } from './common';
import { Match } from './matches';

export type Position = 'GK' | 'CB' | 'FB' | 'CM' | 'WM' | 'F';

type PlayerCommonTypes = {
  firstName: string;
  lastName: string;
  position: Position;
  dateOfBirth: string;
  height: number;
  weight: number;
  footed: 'L' | 'R' | 'both';
  lnpID?: string;
  lnpProfileURL?: string;
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
  docs: Player[];
} & PaginationData;

export type GetPlayers = (
  page: number,
  limit: number,
  sort: string,
  order: Order,
  filters: PlayersFilterData,
) => void;

export type State = {
  playersData: PlayersData;
  playerData: Player | null;
  current: PlayersFormData | null;
  playerMatches: Match[];
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: GetPlayers;
  getPlayer: (id: string) => void;
  getPlayerMatches: (id: string) => void;
  addPlayer: (player: PlayersFormData) => void;
  editPlayer: (player: PlayersFormData) => void;
  setCurrent: (player: Player) => void;
  clearCurrent: () => void;
};

export type PlayersFilterData = {
  lastName: string;
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
  | { type: 'GET_PLAYER_MATCHES_SUCCESS'; payload: Match[] }
  | { type: 'CREATE_PLAYER_SUCCESS' }
  | { type: 'UPDATE_PLAYER_SUCCESS' }
  | { type: 'DELETE_PLAYER_SUCCESS'; payload: string };
