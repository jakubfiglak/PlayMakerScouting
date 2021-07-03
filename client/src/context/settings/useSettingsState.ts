import { useContext } from 'react';
import settingsContext from './settingsContext';
import { State } from './types';

export const useSettingsState = (): State => {
  const context = useContext(settingsContext);
  if (context === undefined) {
    throw new Error('useAlertsState hook must be used within SettingsState');
  }

  return context;
};
