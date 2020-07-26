import { createContext } from 'react';
import { State } from '../../types/orders';

const ordersContext = createContext<State | undefined>(undefined);

export default ordersContext;
