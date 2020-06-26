export type User = {
  role: string;
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  activeRadius: number;
  createdAt: string;
  location: {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    street: string;
    city: string;
    voivodeship: string;
    zipcode: string;
  };
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
  register: (formData: RegisterFormData) => void;
  logout: () => void;
  editDetails: (formData: EditAccountData) => void;
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
  | { type: 'EDIT_FAIL'; payload: string };

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

export type EditAccountData = {
  phone: string | undefined;
  address: string | undefined;
  activeRadius: number | undefined;
};
