import { createContext } from 'react';
import { State } from '../../types/alerts';

const alertsContext = createContext<State | undefined>(undefined);

export default alertsContext;
