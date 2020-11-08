import React, { useEffect } from 'react';
// MUI components
import { Typography, Grid } from '@material-ui/core';
// Custom components
import { GrantAccessForm } from '../forms';
import { Loader } from '../common';
// Hooks
import { useSimplifiedDataState, usePlayersState } from '../../context';
import { useAlert } from '../../hooks';

export const AccessManagementContent = () => {
  const {
    getPlayers,
    getUsers,
    loading,
    playersData,
    usersData,
  } = useSimplifiedDataState();

  const { message, error, clearMessage, clearErrors } = usePlayersState();

  useEffect(() => {
    getPlayers();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

  const nonAdminUsers = usersData.filter((user) => user.role !== 'admin');

  return (
    <div>
      {loading && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Przyznawanie użytkownikom dostępu do zawodników
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <GrantAccessForm
            playersData={playersData}
            usersData={nonAdminUsers}
          />
        </Grid>
      </Grid>
    </div>
  );
};
