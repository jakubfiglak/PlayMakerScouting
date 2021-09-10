import { createContext } from 'react';
import { State } from './types';

const draftsContext = createContext<State | undefined>(undefined);

export default draftsContext;
