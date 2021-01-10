import React, { useEffect } from 'react';
// MUI components
import {
  Typography,
  makeStyles,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
// MUI icons
import { ExpandMore as AccordionIcon } from '@material-ui/icons';
// Custom components
import { AssignPlaymakerRoleForm } from './AssignPlaymakerRoleForm';
import { PlayerAccessForm } from './PlayerAccessForm';
import { ClubAccessForm } from './ClubAccessForm';
import { Loader } from '../../components/Loader';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useUsersState } from '../../context/users/useUsersState';
import { useAlert } from '../../hooks/useAlert';

export const AccessManagementPage = () => {
  const classes = useStyles();

  const {
    loading,
    usersList,
    getUsersList,
    message,
    error,
    clearMessage,
    clearErrors,
    assignPlaymakerRole,
  } = useUsersState();

  const {
    playersList,
    getPlayersList,
    loading: playersLoading,
    message: playersMessage,
    error: playersError,
    clearMessage: clearPlayersMessage,
    clearErrors: clearPlayersErrors,
    grantAccess,
  } = usePlayersState();

  const {
    clubsList,
    getClubsList,
    loading: clubsLoading,
    message: clubsMessage,
    error: clubsError,
    clearMessage: clearClubsMessage,
    clearErrors: clearClubsErrors,
    grantAccess: grantClubAccess,
  } = useClubsState();

  useEffect(() => {
    getPlayersList();
    getClubsList();
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAlert(playersError, 'error', clearPlayersErrors);
  useAlert(clubsError, 'error', clearClubsErrors);
  useAlert(error, 'error', clearErrors);
  useAlert(playersMessage, 'success', clearPlayersMessage);
  useAlert(clubsMessage, 'success', clearClubsMessage);
  useAlert(message, 'success', clearMessage);

  const nonAdminUsers = usersList.filter((user) => user.role !== 'admin');
  const regularScoutUsers = usersList.filter((user) => user.role === 'scout');

  return (
    <>
      {(loading || playersLoading || clubsLoading) && <Loader />}
      <Typography
        variant="h6"
        component="h2"
        align="center"
        className={classes.header}
      >
        Zarządzanie dostępami
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<AccordionIcon />}
          aria-controls="assign-role-content"
          id="assign-role-header"
        >
          <Typography className={classes.accordionTitle}>
            Nadaj rolę playmaker-scout
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AssignPlaymakerRoleForm
            usersData={regularScoutUsers}
            onSubmit={assignPlaymakerRole}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<AccordionIcon />}
          aria-controls="grant-player-access-content"
          id="grant-player-access-header"
        >
          <Typography className={classes.accordionTitle}>
            Przyznaj dostęp do zawodnika
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PlayerAccessForm
            playersData={playersList}
            usersData={nonAdminUsers}
            onSubmit={grantAccess}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<AccordionIcon />}
          aria-controls="grant-club-access-content"
          id="grant-club-access-header"
        >
          <Typography className={classes.accordionTitle}>
            Przyznaj dostęp do klubu
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ClubAccessForm
            clubsData={clubsList}
            usersData={nonAdminUsers}
            onSubmit={grantClubAccess}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
}));
