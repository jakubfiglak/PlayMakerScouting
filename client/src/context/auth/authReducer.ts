import { State, Action } from '../../types/auth';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'CONFIRMATION_SUCCESS':
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        error: null,
      };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.data.user));
      localStorage.setItem(
        'expiresAt',
        JSON.stringify(action.payload.data.expiresAt),
      );
      return {
        ...state,
        message: action.payload.message,
        user: action.payload.data.user,
        expiresAt: action.payload.data.expiresAt,
        loading: false,
        error: null,
      };

    case 'UPDATE_PASSWORD_SUCCESS':
      return {
        ...state,
        expiresAt: action.payload.expiresAt,
        message: action.payload.message,
        loading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      localStorage.removeItem('user');
      localStorage.removeItem('expiresAt');
      return {
        ...state,
        loading: false,
        user: null,
        expiresAt: null,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('expiresAt');
      return {
        ...state,
        expiresAt: null,
        loading: false,
        user: null,
        error: null,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };

    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };

    case 'EDIT_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
        loading: false,
      };

    case 'EDIT_ERROR':
    case 'CLUBS_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
