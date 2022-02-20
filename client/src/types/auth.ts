import { Voivodeship } from './common';
import type { Match } from './matches';
import type { Team } from './teams';

export type UserRole = 'admin' | 'playmaker-scout' | 'scout';

export type User = {
  id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  voivodeship?: Voivodeship | 'Zagranica';
  phone?: string;
  activeRadius?: number;
  createdAt: string;
  team: Team | null;
  match: Match | null;
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

export type ForgotPasswordFormData = {
  email: string;
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
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  setLoading: () => void;
  register: (formData: RegisterFormData) => void;
  confirmAccount: (confirmationCode: string) => void;
  login: (formData: LoginFormData) => void;
  logout: () => void;
  editDetails: (formData: EditAccountData) => void;
  updatePassword: (formData: UpdatePasswordData) => void;
  isAuthenticated: () => boolean;
};

export type Action =
  | { type: 'REGISTER_SUCCESS'; payload: { message: string } }
  | { type: 'CONFIRMATION_SUCCESS'; payload: { message: string } }
  | { type: 'AUTH_ERROR'; payload: string }
  | {
      type: 'LOGIN_SUCCESS';
      payload: { message: string; data: { user: User; expiresAt: number } };
    }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING' }
  | { type: 'EDIT_SUCCESS'; payload: { user: User; message: string } }
  | { type: 'EDIT_ERROR'; payload: string }
  | {
      type: 'UPDATE_PASSWORD_SUCCESS';
      payload: { expiresAt: number; message: string };
    }
  | { type: 'CLUBS_ERROR'; payload: string };
