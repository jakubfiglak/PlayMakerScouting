type User = {
  role: string;
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  activeRadius: number;
  createdAt: string;
  __v: number;
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
  logout: () => void;
};

export type Action =
  | { type: 'REGISTER_SUCCESS' }
  | { type: 'REGISTER_FAIL' }
  | { type: 'USER_LOADED'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'LOGIN_SUCCESS'; payload: string }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'SET_LOADING' };

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
