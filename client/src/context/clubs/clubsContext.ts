import { createContext } from 'react';
import { State } from '../../types/clubs';

const clubsContext = createContext<State | undefined>(undefined);

export default clubsContext;
