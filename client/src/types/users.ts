import { User, UserRole } from './auth';
import { Voivodeship } from './common';

export type UserBasicInfo = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'team'
>;

export type AssignPlaymakerRoleData = {
  user: string;
};

export type UserFilterData = {
  lastName: string;
  voivodeship: Voivodeship | '';
  city: string;
  role: UserRole | '';
};

export type State = {
  usersList: UserBasicInfo[];
  loading: boolean;
  error: string | null;
  message: string | null;
  getUsersList: () => void;
  setLoading: () => void;
  assignPlaymakerRole: (id: string) => void;
};

export type Action =
  | { type: 'SET_LOADING' }
  | { type: 'USERS_ERROR'; payload: string }
  | { type: 'GET_USERS_LIST_SUCCESS'; payload: UserBasicInfo[] }
  | {
      type: 'ASSIGN_ROLE_SUCCESS';
      payload: { user: User; message: string };
    };
