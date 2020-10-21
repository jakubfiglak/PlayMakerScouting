import { useEffect } from 'react';
import { AlertType } from '../types/alerts';
import { useAlertsState } from '../context';

export const useAlert = (
  message: string | null,
  type: AlertType,
  onClear: () => void,
) => {
  const { setAlert } = useAlertsState();

  useEffect(() => {
    if (message) {
      setAlert(message, type);
      onClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);
};
