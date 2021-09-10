import { State, Action } from './types';

export default (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MATCH':
      return {
        ...state,
        match: action.payload,
        note: null,
        order: null,
      };

    case 'SET_NOTE':
      return {
        ...state,
        note: action.payload,
        match: null,
        order: null,
      };

    case 'SET_ORDER':
      return {
        ...state,
        order: action.payload,
        note: null,
        match: null,
      };

    case 'CLEAR_DRAFTS':
      return {
        ...state,
        order: null,
        note: null,
        match: null,
      };

    default:
      return state;
  }
};
