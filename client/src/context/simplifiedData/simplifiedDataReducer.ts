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

    case 'SIMPLIFIED_DATA_ERROR':
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

    case 'GET_MY_CLUBS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        myClubsData: action.payload,
      };

    case 'GET_MY_ORDERS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        myOrdersData: action.payload,
      };

    default:
      return state;
  }
};
