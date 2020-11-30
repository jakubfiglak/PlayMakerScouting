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
import { getLabel } from '../../utils';

export const Profile = () => {
  // useAuthorization();
  const { user, error, clearErrors, message, clearMessage } = useAuthState();

  useAlert(getLabel(error, errorLabels), 'error', clearErrors);
  useAlert(getLabel(message, messageLabels), 'success', clearMessage);

  return (
    <MainTemplate>
      <Grid container>
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
