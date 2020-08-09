import { createContext } from 'react';
import { State } from '../../types/auth';

const authContext = createContext<State | undefined>(undefined);

export default authContext;
