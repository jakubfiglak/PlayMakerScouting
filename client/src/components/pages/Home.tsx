import React from 'react';
// Custom components
import MainTemplate from '../templates/MainTemplate/MainTemplate';
// Hooks
import { useAuthorization, useAlert } from '../../hooks';
import { useAuthState } from '../../context';
// Utils & data
import { messageLabels } from '../../data/labels';

export const Home = () => {
  useAuthorization();

  const { message, clearMessage } = useAuthState();

  useAlert(message, 'success', messageLabels, clearMessage);

  return (
    <MainTemplate>
      <h1>hello</h1>
    </MainTemplate>
  );
};
