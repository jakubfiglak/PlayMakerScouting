import { useContext } from 'react';
import ordersContext from './ordersContext';
import { State } from '../../types/orders';

export const useOrdersState = (): State => {
  const context = useContext(ordersContext);
  if (context === undefined) {
    throw new Error('useOrdersState hook must be used within OrdersState');
  }

  return context;
};
