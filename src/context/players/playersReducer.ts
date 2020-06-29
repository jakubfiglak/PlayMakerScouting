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
        playersData: {
          data: action.payload.data,
          total: action.payload.total,
          pagination: action.payload.pagination,
        },
      };

    case 'GET_PLAYERS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
