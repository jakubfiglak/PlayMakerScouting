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
        matchesData: {
          data: action.payload.data,
          total: action.payload.total,
          pagination: action.payload.pagination,
        },
      };

    case 'CREATE_MATCH_SUCCESS':
    case 'UPDATE_MATCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DELETE_MATCH_SUCCESS':
      return {
        ...state,
        matchesData: {
          data: state.matchesData.data.filter(
            (match) => match._id !== action.payload,
          ),
          total: state.matchesData.total - 1,
          pagination: state.matchesData.pagination,
        },
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
