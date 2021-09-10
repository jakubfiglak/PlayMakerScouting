import { Match } from '../../types/matches';
import { Note } from '../../types/notes';
import { Order } from '../../types/orders';

export type State = {
  match: Match | null;
  note: Note | null;
  order: Order | null;
  setMatch: (match: Match) => void;
  setNote: (note: Note) => void;
  setOrder: (order: Order) => void;
  clearDrafts: () => void;
};

export type Action =
  | { type: 'SET_MATCH'; payload: Match }
  | { type: 'SET_NOTE'; payload: Note }
  | { type: 'SET_ORDER'; payload: Order }
  | { type: 'CLEAR_DRAFTS' };
