import React, { useEffect } from 'react';
// MUI components
import { Typography, Grid } from '@material-ui/core';
// Custom components
import { MainTemplate } from '../../templates/MainTemplate';
import {
  GrantAccessForm,
  AssignPlaymakerRoleForm,
} from '../../components/forms';
import { Loader } from '../../components/common';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { useSimplifiedDataState } from '../../context/simplifiedData/useSimplifiedDataState';
import { useUsersState } from '../../context/users/useUsersState';
import { useAlert } from '../../hooks';

export const AccessManagementPage = () => {
  const {
    getPlayers,
    getUsers,
    loading,
    playersData,
    usersData,
  } = useSimplifiedDataState();

  const {
    message: playersMessage,
    error: playersError,
    clearMessage: clearPlayersMessage,
    clearErrors: clearPlayersError,
  } = usePlayersState();
  const {
    message: usersMessage,
    error: usersError,
    clearMessage: clearUsersMessage,
    clearErrors: clearUsersError,
  } = useUsersState();

  useEffect(() => {
    getPlayers();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAlert(playersError, 'error', clearPlayersError);
  useAlert(usersError, 'error', clearUsersError);
  useAlert(playersMessage, 'success', clearPlayersMessage);
  useAlert(usersMessage, 'success', clearUsersMessage);

  const nonAdminUsers = usersData.filter((user) => user.role !== 'admin');
  const regularScoutUsers = usersData.filter((user) => user.role === 'scout');

  return (
    <MainTemplate>
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
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            Przyznawanie użytkownikom roli <strong>playmaker-scout</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AssignPlaymakerRoleForm usersData={regularScoutUsers} />
        </Grid>
      </Grid>
    </MainTemplate>
  );
};
