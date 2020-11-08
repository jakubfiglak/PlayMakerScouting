import { Location, Address } from './common';

export type UserRole = 'admin' | 'playmaker-scout' | 'scout';

export type User = {
  _id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  activeRadius: number;
  createdAt: string;
  location: Location;
  address: Address;
  myClubs: string[];
  myPlayers: string[];
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  activeRadius: number;
  password: string;
  passwordConfirm: string;
};

export type EditAccountData = {
  phone: string;
  activeRadius: number;
  address: Address;
};

export type UpdatePasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type State = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  clearErrors: () => void;
  clearMessage: () => void;
  loadUser: () => void;
  login: (formData: LoginFormData) => void;
  register: (formData: RegisterFormData) => void;
  logout: () => void;
  editDetails: (formData: EditAccountData) => void;
  updatePassword: (formData: UpdatePasswordData) => void;
  addClubToFavorites: (id: string) => void;
  removeClubFromFavorites: (id: string) => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: { token: string; message: string } }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string; message: string } }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'CLEAR_MESSAGE' }
  | { type: 'SET_LOADING' }
  | { type: 'EDIT_SUCCESS'; payload: { user: User; message: string } }
  | { type: 'EDIT_ERROR'; payload: string }
  | {
      type: 'UPDATE_PASSWORD_SUCCESS';
      payload: { token: string; message: string };
    }
  | { type: 'ADD_CLUB_TO_FAVORITES_SUCCESS'; payload: string }
  | { type: 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS'; payload: string }
  | { type: 'CLUBS_ERROR'; payload: string };
