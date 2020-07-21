import { createContext } from 'react';
import { State } from '../../types/players';

const playersContext = createContext<State | undefined>(undefined);

export default playersContext;
