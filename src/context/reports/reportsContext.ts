import { createContext } from 'react';
import { State } from '../../types/reports';

const reportsContext = createContext<State | undefined>(undefined);

export default reportsContext;
