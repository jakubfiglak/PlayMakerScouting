import { Division } from './clubs';
import { SortingOrder, PaginatedData } from './common';

export type Position =
  | 'GK'
  | 'LB'
  | 'RB'
  | 'CB'
  | 'LW'
  | 'LWB'
  | 'RW'
  | 'RWB'
  | 'DM'
  | 'CM'
  | 'CAM'
  | 'F';

export type Foot = 'L' | 'R' | 'both';

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: Position;
  yearOfBirth: number;
  height?: number;
  weight?: number;
  footed: Foot;
  club: {
    id: string;
    name: string;
    division: Division;
  };
  lnpID?: string;
  lnpProfileURL?: string;
  minut90ProfileURL?: string;
  transfermarktProfileURL?: string;
};

export type PlayerBasicInfo = Pick<
  Player,
  'id' | 'firstName' | 'lastName' | 'position' | 'club'
>;

export type PlayersFormData = Omit<Player, 'id' | 'club'> & {
  club: string;
};

export type PlayersFilterData = {
  lastName: string;
  club: string;
  position: string;
  bornAfter?: number;
  bornBefore?: number;
};

export type GrantAccessFormData = {
  user: string;
  player: string;
};

export type GrantAccessArgs = { userId: string; playerId: string };

export type GetPlayers = (
  page: number,
  limit: number,
  sort: string,
  order: SortingOrder,
  filters: PlayersFilterData,
) => void;

export type State = {
  playersData: PaginatedData<Player>;
  playersList: PlayerBasicInfo[];
  playerData: Player | null;
  current: Player | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  getPlayers: GetPlayers;
  getPlayersList: () => void;
  getPlayer: (id: string) => void;
  addPlayer: (player: PlayersFormData) => void;
  editPlayer: (id: string, data: PlayersFormData) => void;
  grantAccess: ({ playerId, userId }: GrantAccessArgs) => void;
  setCurrent: (player: Player) => void;
  clearCurrent: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'SET_CURRENT'; payload: Player }
  | { type: 'CLEAR_CURRENT' }
  | { type: 'PLAYERS_ERROR'; payload: string }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PaginatedData<Player> }
  | { type: 'GET_PLAYERS_LIST_SUCCESS'; payload: PlayerBasicInfo[] }
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
