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
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        message: action.payload.message,
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

    case 'CLEAR_MESSAGE':
      return {
        ...state,
        message: null,
      };

    case 'EDIT_SUCCESS':
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

    case 'ADD_CLUB_TO_FAVORITES_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user!,
          myClubs: [action.payload, ...state.user!.myClubs],
        },
      };

    case 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user!,
          myClubs: state.user!.myClubs.filter(
            (club) => club !== action.payload,
          ),
        },
      };

    default:
      return state;
  }
};
