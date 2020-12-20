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

    case 'CREATE_PLAYER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        playersData: {
          ...state.playersData,
          docs: [action.payload.player, ...state.playersData.docs],
        },
      };

    case 'UPDATE_PLAYER_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        playersData: {
          ...state.playersData,
          docs: state.playersData.docs.map((player) =>
            player._id === action.payload.player._id
              ? action.payload.player
              : player,
          ),
        },
      };

    case 'GRANT_ACCESS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
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
