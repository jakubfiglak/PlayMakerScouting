import { createContext } from 'react';
import { State } from '../../types/simplifiedData';

const simplifiedDataContext = createContext<State | undefined>(undefined);

export default simplifiedDataContext;
