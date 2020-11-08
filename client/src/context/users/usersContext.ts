import { createContext } from 'react';
import { State } from '../../types/users';

const usersContext = createContext<State | undefined>(undefined);

export default usersContext;
