import { createContext } from 'react';
import { State } from '../../types/matches';

const matchesContext = createContext<State | undefined>(undefined);

export default matchesContext;
