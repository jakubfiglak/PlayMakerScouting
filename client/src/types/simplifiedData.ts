import { Position } from './players';
import { UserRole } from './auth';

export type PlayerData = {
  _id: string;
  firstName: string;
  lastName: string;
  position: Position;
  club: {
    _id: string;
    name: string;
  };
};

export type ClubData = {
  _id: string;
  name: string;
};

export type OrderData = {
  _id: string;
  player: PlayerData;
  docNumber: string;
};

export type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

export type State = {
  playersData: PlayerData[];
  clubsData: ClubData[];
  usersData: UserData[];
  myClubsData: ClubData[];
  myOrdersData: OrderData[];
  loading: boolean;
  error: string | null;
  setLoading: () => void;
  getPlayers: () => void;
  getClubs: () => void;
  getMyClubs: () => void;
  getMyOrders: () => void;
  getUsers: () => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'GET_PLAYERS_SUCCESS'; payload: PlayerData[] }
  | { type: 'GET_MY_ORDERS_SUCCESS'; payload: OrderData[] }
  | { type: 'GET_CLUBS_SUCCESS'; payload: ClubData[] }
  | { type: 'GET_MY_CLUBS_SUCCESS'; payload: ClubData[] }
  | { type: 'GET_USERS_SUCCESS'; payload: UserData[] }
  | { type: 'SIMPLIFIED_DATA_ERROR'; payload: string };
