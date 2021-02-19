import { Voivodeship } from './common';

export type UserRole = 'admin' | 'playmaker-scout' | 'scout';

export type User = {
  _id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  voivodeship?: Voivodeship | 'Zagranica';
  phone?: string;
  activeRadius?: number;
  createdAt: string;
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
  password: string;
  passwordConfirm: string;
};

export type EditAccountData = Pick<
  User,
  'firstName' | 'lastName' | 'activeRadius'
> & {
  city: string | '';
  voivodeship: Voivodeship | 'Zagranica' | '';
  phone: string | '';
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
  register: (formData: RegisterFormData) => void;
  confirmAccount: (confirmationCode: string) => void;
  login: (formData: LoginFormData) => void;
  logout: () => void;
  editDetails: (formData: EditAccountData) => void;
  updatePassword: (formData: UpdatePasswordData) => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: { message: string } }
  | { type: 'CONFIRMATION_SUCCESS'; payload: { message: string } }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | {
      type: 'LOGIN_SUCCESS';
      payload: { token: string; message: string; user: User };
    }
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
  | { type: 'CLUBS_ERROR'; payload: string };
