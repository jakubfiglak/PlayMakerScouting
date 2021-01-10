import React from 'react';
// Custom components
// Hooks
import { useAlert } from '../../hooks';
import { useAuthState } from '../../context/auth/useAuthState';
// Utils & data
import { getLabel } from '../../utils/getLabel';

export const HomePage = () => {
  const { message, clearMessage } = useAuthState();

  useAlert(getLabel(message), 'success', clearMessage);

  return (
    <>
      <h1>hello</h1>
    </>
  );
};
