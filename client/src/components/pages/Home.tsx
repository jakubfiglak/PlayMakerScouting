import React from 'react';
// Custom components
import MainTemplate from '../templates/MainTemplate/MainTemplate';
// Hooks
import { useAuthorization, useAlert } from '../../hooks';
import { useAuthState } from '../../context';
// Utils & data
import { getLabel } from '../../utils';
import { messageLabels } from '../../data/labels';

export const Home = () => {
  // useAuthorization();

  const { message, clearMessage } = useAuthState();

  useAlert(getLabel(message, messageLabels), 'success', clearMessage);

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};
