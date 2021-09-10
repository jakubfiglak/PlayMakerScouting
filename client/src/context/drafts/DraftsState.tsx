import { useReducer, FC } from 'react';
import DraftsContext from './draftsContext';
import draftsReducer from './draftsReducer';
import { State } from './types';
import { Match } from '../../types/matches';
import { Note } from '../../types/notes';
import { Order } from '../../types/orders';

export const DraftsState: FC = ({ children }) => {
  const initialState: State = {
    match: null,
    note: null,
    order: null,
    setMatch: () => null,
    setNote: () => null,
    setOrder: () => null,
    clearDrafts: () => null,
  };

  const [state, dispatch] = useReducer(draftsReducer, initialState);

  // Set match
  function setMatch(match: Match) {
    dispatch({
      type: 'SET_MATCH',
      payload: match,
    });
  }

  // Set note
  function setNote(note: Note) {
    dispatch({
      type: 'SET_NOTE',
      payload: note,
    });
  }

  // Set order
  function setOrder(order: Order) {
    dispatch({
      type: 'SET_ORDER',
      payload: order,
    });
  }

  // Clear drafts
  function clearDrafts() {
    dispatch({
      type: 'CLEAR_DRAFTS',
    });
  }

  const { match, note, order } = state;

  return (
    <DraftsContext.Provider
      value={{
        match,
        note,
        order,
        setMatch,
        setNote,
        setOrder,
        clearDrafts,
      }}
    >
      {children}
    </DraftsContext.Provider>
  );
};
