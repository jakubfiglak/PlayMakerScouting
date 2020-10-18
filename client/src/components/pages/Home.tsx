import React, { useEffect } from 'react';
// Custom components
import MainTemplate from '../templates/MainTemplate/MainTemplate';
// Hooks
import { useAuthorization } from '../../hooks';
import { useAuthState, useAlertsState } from '../../context';
// Utils & data
import { getLabel } from '../../utils';
import { messageLabels } from '../../data/labels';

export const Home = () => {
  useAuthorization();

  const authContext = useAuthState();
  const alertsContext = useAlertsState();

  const { message, clearMessage } = authContext;
  const { setAlert } = alertsContext;

  useEffect(() => {
    console.log('hello', message);
    if (message) {
      setAlert(getLabel(message, messageLabels), 'success');
      clearMessage();
    }
  }, [message]);

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};
