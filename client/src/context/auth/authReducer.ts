import { State, Action } from '../../types/auth';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_PASSWORD_SUCCESS':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
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

    case 'EDIT_SUCCESS':
      return { ...state, loading: false };

    case 'EDIT_ERROR':
    case 'CLUBS_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'ADD_CLUB_TO_FAVORITES_SUCCESS':
    case 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
