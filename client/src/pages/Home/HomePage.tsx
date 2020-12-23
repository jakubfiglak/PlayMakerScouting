import React from 'react';
// Custom components
import MainTemplate from '../../templates/MainTemplate';
// Hooks
import { useAlert } from '../../hooks';
import { useAuthState } from '../../context/auth/useAuthState';
// Utils & data
import { getLabel } from '../../utils';
import { messageLabels } from '../../data/labels';

export const HomePage = () => {
  const { message, clearMessage } = useAuthState();

  useAlert(getLabel(message, messageLabels), 'success', clearMessage);

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};
