import React from 'react';
// MUI components
import { Grid } from '@material-ui/core';
// Custom components
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { DetailsCard, PasswordCard } from '../profile';
// Hooks
import { useAuthState } from '../../context';
import { useAuthorization, useAlert } from '../../hooks';
// Utils & data
import { errorLabels, messageLabels } from '../../data';

export const Profile = () => {
  useAuthorization();
  const authContext = useAuthState();

  const { user, error, clearErrors, message, clearMessage } = authContext;

  useAlert(error, 'error', errorLabels, clearErrors);
  useAlert(message, 'success', messageLabels, clearMessage);

  return (
    <MainTemplate>
      <Grid container spacing={3}>
        <Grid item lg={6} sm={12}>
          <DetailsCard user={user} />
        </Grid>
        <Grid item lg={6} sm={12}>
          <PasswordCard />
        </Grid>
      </Grid>
    </MainTemplate>
  );
};
