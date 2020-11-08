import { useContext } from 'react';
import alertsContext from './alertsContext';
import { State } from '../../types/alerts';

export const useAlertsState = (): State => {
  const context = useContext(alertsContext);
  if (context === undefined) {
    throw new Error('useAlertsState hook must be used within AlertsState');
  }

  return context;
};
