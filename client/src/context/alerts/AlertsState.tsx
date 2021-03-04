import React, { useReducer, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertsContext from './alertsContext';
import alertsReducer from './alertsReducer';
import { State, SetAlertParams } from '../../types/alerts';

export const AlertsState: FC = ({ children }) => {
  const initialState: State = {
    alerts: [],
    setAlert: () => null,
  };

  const [state, dispatch] = useReducer(alertsReducer, initialState);

  // Set alert
  const setAlert = ({ msg, type, timeout = 5000 }: SetAlertParams) => {
    const id = uuidv4();

    dispatch({
      type: 'SET_ALERT',
      payload: { id, msg, type, isVisible: true },
    });

    setTimeout(
      () => dispatch({ type: 'HIDE_ALERT', payload: id }),
      timeout - 1000,
    );

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
  };

  const { alerts } = state;

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        setAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
