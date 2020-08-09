import React from 'react';
import { Grid } from '@material-ui/core';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import { DetailsCard, PasswordCard } from '../profile';
import { useAuthState } from '../../context';
import { useAuthorization } from '../../hooks';

export const Profile = () => {
  useAuthorization();
  const authContext = useAuthState();

  const { user } = authContext;

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
