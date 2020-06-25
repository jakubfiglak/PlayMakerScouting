export type State = {
  user: string | null;
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  error: string | null;
  login: (formData: LoginFormData) => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'REGISTER_FAIL' }
  | { type: 'USER_LOADED'; payload: string | null }
  | { type: 'AUTH_ERROR' }
  | { type: 'LOGIN_SUCCESS'; payload: { token: string } }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' };

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  address: string;
  activeRadius: number;
  password: string;
  passwordConfirm: string;
};
