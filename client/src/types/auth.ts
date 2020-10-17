import { Location, Address, Voivodeship } from './common';

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
  phone?: string;
  activeRadius: number;
  street: string;
  streetNo: string;
  zipCode: string;
  city: string;
  voivodeship: Voivodeship | '';
  country: string;
};

export type FormattedEditAccountData = {
  phone?: string;
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
  setLoading: () => void;
  loadUser: () => void;
  login: (formData: LoginFormData) => void;
  register: (formData: RegisterFormData) => void;
  logout: () => void;
  editDetails: (formData: FormattedEditAccountData) => void;
  updatePassword: (formData: UpdatePasswordData) => void;
  addClubToFavorites: (id: string) => void;
  removeClubFromFavorites: (id: string) => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: string }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' }
  | { type: 'EDIT_SUCCESS' }
  | { type: 'EDIT_ERROR'; payload: string }
  | { type: 'UPDATE_PASSWORD_SUCCESS'; payload: string }
  | { type: 'ADD_CLUB_TO_FAVORITES_SUCCESS' }
  | { type: 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS' }
  | { type: 'CLUBS_ERROR'; payload: string };
