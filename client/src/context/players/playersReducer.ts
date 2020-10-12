import { State, Action } from '../../types/players';

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

    case 'GET_PLAYER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        playerData: action.payload,
      };

    case 'GET_PLAYER_MATCHES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        playerMatches: action.payload,
      };

    case 'CREATE_PLAYER_SUCCESS':
    case 'UPDATE_PLAYER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
      };

    case 'PLAYERS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_CURRENT':
      return {
        ...state,
        current: {
          ...action.payload,
          club: action.payload.club._id,
        },
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
