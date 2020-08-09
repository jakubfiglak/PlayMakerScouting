import { useContext } from 'react';
import reportsContext from './reportsContext';
import { State } from '../../types/reports';

export const useReportsState = (): State => {
  const context = useContext(reportsContext);
  if (context === undefined) {
    throw new Error('useReporstState hook must be used within ReportsState');
  }

  return context;
};
