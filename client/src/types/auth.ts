import { Location, Address, Voivodeship } from './common';

type UserRole = 'admin' | 'playmaker-scout' | 'scout';

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

type CommonFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  activeRadius: number;
  password: string;
  passwordConfirm: string;
};

export type RegisterFormData = {
  street: string;
  streetNo: string;
  zipCode: string;
  city: string;
  voivodeship: Voivodeship | '';
  country: string;
} & CommonFormData;

export type FormattedRegisterFormData = {
  address: Address;
} & CommonFormData;

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
  register: (formData: FormattedRegisterFormData) => void;
  logout: () => void;
  editDetails: (formData: FormattedEditAccountData) => void;
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
