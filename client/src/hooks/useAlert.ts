import { useEffect } from 'react';
import { AlertType } from '../types/alerts';
import { getLabel } from '../utils';
import { useAlertsState } from '../context';

export const useAlert = (
  message: string | null,
  type: AlertType,
  dictionary: {
    value: string;
    label: string;
  }[],
  onClear: () => void,
) => {
  const { setAlert } = useAlertsState();

  useEffect(() => {
    if (message) {
      setAlert(getLabel(message, dictionary), type);
      onClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
};
