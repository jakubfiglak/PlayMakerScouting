import { State, Action } from '../../types/clubs';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_CLUBS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        clubsData: {
          data: action.payload.data,
          total: action.payload.total,
          pagination: action.payload.pagination,
        },
      };

    case 'CREATE_CLUB_SUCCESS':
    case 'UPDATE_CLUB_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'DELETE_CLUB_SUCCESS':
      return {
        ...state,
        clubsData: {
          data: state.clubsData.data.filter(
            (club) => club._id !== action.payload,
          ),
          total: state.clubsData.total - 1,
          pagination: state.clubsData.pagination,
        },
        loading: false,
        error: null,
      };

    case 'CLUBS_ERROR':
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
