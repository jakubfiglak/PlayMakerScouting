import { Location, Address } from './common';

export type User = {
  _id: string;
  role: string;
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
  editDetails: (formData: EditAccountData) => void;
  updatePassword: (formData: UpdatePasswordData) => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: string }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' }
  | { type: 'EDIT_SUCCESS' }
  | { type: 'EDIT_FAIL'; payload: string }
  | { type: 'UPDATE_PASSWORD_SUCCESS'; payload: string }
  | { type: 'UPDATE_PASSWORD_FAIL'; payload: string };

export type LoginFormData = {
  email: string;
  password: string;
};

// TODO: Adjust register form data to current format accepted by the API (address)

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  activeRadius: number;
  password: string;
  passwordConfirm: string;
};

export type EditAccountData = {
  phone: string | undefined;
  address: string | undefined;
  activeRadius: number | undefined;
};

export type UpdatePasswordData = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};
