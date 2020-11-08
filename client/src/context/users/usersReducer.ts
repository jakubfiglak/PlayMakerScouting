import { State, Action } from '../../types/users';

export default (state: State, action: Action): State => {
  switch (action.type) {
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

    case 'USERS_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ASSIGN_ROLE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
      };

    default:
      return state;
  }
};
