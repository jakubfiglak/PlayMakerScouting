import { Order, PaginationData } from './common';

export type Position = 'GK' | 'CB' | 'FB' | 'CM' | 'WM' | 'F';
export type Foot = 'L' | 'R' | 'both';

export type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  position: Position;
  yearOfBirth: number;
  height?: number;
  weight?: number;
  footed: Foot;
  club: {
    _id: string;
    name: string;
  };
  lnpID?: string;
  lnpProfileURL?: string;
};

export type PlayersFormData = Omit<Player, '_id' | 'club'> & {
  club: string;
};

export type PlayersData = {
  docs: Player[];
} & PaginationData;

export type PlayersFilterData = {
  lastName: string;
  club: string;
  position: string;
};

export type GrantAccessFormData = {
  user: string;
  player: string;
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
  playerData: Player | null;
  current: Player | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  getPlayers: GetPlayers;
  getPlayer: (id: string) => void;
  addPlayer: (player: PlayersFormData) => void;
  editPlayer: (id: string, data: PlayersFormData) => void;
  grantAccess: (data: GrantAccessFormData) => void;
  setCurrent: (player: Player) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Player }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'PLAYERS_ERROR'; payload: string }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayersData }
  | { type: 'GET_PLAYER_SUCCESS'; payload: Player }
  | {
      type: 'CREATE_PLAYER_SUCCESS';
      payload: { player: Player; message: string };
    }
  | {
      type: 'UPDATE_PLAYER_SUCCESS';
      payload: { player: Player; message: string };
    }
  | { type: 'DELETE_PLAYER_SUCCESS'; payload: string }
  | { type: 'GRANT_ACCESS_SUCCESS'; payload: { message: string } };
