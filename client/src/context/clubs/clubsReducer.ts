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
        clubsData: action.payload,
      };

    case 'GET_MY_CLUBS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        myClubsData: action.payload,
      };

    case 'CREATE_CLUB_SUCCESS':
    case 'UPDATE_CLUB_SUCCESS':
      return {
        ...state,
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
