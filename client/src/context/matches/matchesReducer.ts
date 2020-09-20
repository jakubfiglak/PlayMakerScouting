import { State, Action } from '../../types/matches';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_MATCHES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        matchesData: action.payload,
      };

    case 'CREATE_MATCH_SUCCESS':
    case 'UPDATE_MATCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'MATCHES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };

    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };

    default:
      return state;
  }
};
