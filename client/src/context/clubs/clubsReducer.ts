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
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        clubsData: {
          ...state.clubsData,
          docs: [action.payload.club, ...state.clubsData.docs],
        },
        myClubsData: {
          ...state.myClubsData,
          docs: [action.payload.club, ...state.myClubsData.docs],
        },
      };

    case 'UPDATE_CLUB_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        clubsData: {
          ...state.clubsData,
          docs: state.clubsData.docs.map((club) =>
            club._id === action.payload.club._id ? action.payload.club : club,
          ),
        },
        myClubsData: {
          ...state.myClubsData,
          docs: state.myClubsData.docs.map((club) =>
            club._id === action.payload.club._id ? action.payload.club : club,
          ),
        },
      };

    case 'ADD_CLUB_TO_FAVORITES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        myClubsData: {
          ...state.myClubsData,
          docs: [action.payload.club, ...state.clubsData.docs],
        },
      };

    case 'REMOVE_CLUB_FROM_FAVORITES_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
        myClubsData: {
          ...state.myClubsData,
          docs: state.myClubsData.docs.filter(
            (club) => club._id !== action.payload.id,
          ),
        },
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
