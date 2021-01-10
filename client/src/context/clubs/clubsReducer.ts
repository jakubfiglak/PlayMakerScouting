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

    case 'GET_CLUBS_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        clubsList: action.payload,
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
        clubsList: [
          ...state.clubsList,
          { _id: action.payload.club._id, name: action.payload.club.name },
        ],
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
        clubsList: state.clubsList.map((club) =>
          club._id === action.payload.club._id
            ? { ...club, name: action.payload.club.name }
            : club,
        ),
      };

    case 'GRANT_ACCESS_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.message,
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
