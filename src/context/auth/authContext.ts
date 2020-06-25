import { createContext } from 'react';
import { State } from './types';

const authContext = createContext<State | undefined>(undefined);

export default authContext;
