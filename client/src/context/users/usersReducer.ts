import { State, Action } from '../../types/users';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'GET_USERS_LIST_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        usersList: action.payload,
      };

    case 'USERS_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ASSIGN_ROLE_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        usersList: state.usersList.map((user) =>
          user.id === action.payload.user.id ? action.payload.user : user,
        ),
        message: action.payload.message,
      };

    default:
      return state;
  }
};
