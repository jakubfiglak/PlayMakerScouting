import { State, Action } from '../../types/simplifiedData';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_PLAYERS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        playersData: action.payload,
      };

    case 'GET_PLAYERS_FAIL':
    case 'GET_CLUBS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'GET_CLUBS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        clubsData: action.payload,
      };

    default:
      return state;
  }
};
