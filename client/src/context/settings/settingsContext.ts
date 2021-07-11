import { createContext } from 'react';
import { State } from './types';

const settingsContext = createContext<State | undefined>(undefined);

export default settingsContext;
