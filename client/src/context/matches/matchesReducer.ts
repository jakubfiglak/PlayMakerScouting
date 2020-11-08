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
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        matchesData: {
          ...state.matchesData,
          docs: [action.payload.match, ...state.matchesData.docs],
        },
      };

    case 'UPDATE_MATCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        matchesData: {
          ...state.matchesData,
          docs: state.matchesData.docs.map((match) =>
            match._id === action.payload.match._id
              ? action.payload.match
              : match,
          ),
        },
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

    default:
      return state;
  }
};
