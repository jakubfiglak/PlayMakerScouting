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
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useUsersState } from '../../context/users/useUsersState';

export const AccessManagementPage = () => {
  const classes = useStyles();

  const {
    loading,
    usersList,
    getUsersList,
    assignPlaymakerRole,
  } = useUsersState();

  const {
    playersList,
    getPlayersList,
    loading: playersLoading,

    grantAccess,
  } = usePlayersState();

  const {
    clubsList,
    getClubsList,
    loading: clubsLoading,

    grantAccess: grantClubAccess,
  } = useClubsState();

  useEffect(() => {
    getPlayersList();
    getClubsList();
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nonAdminUsers = usersList.filter((user) => user.role !== 'admin');
  const regularScoutUsers = usersList.filter((user) => user.role === 'scout');

  return (
    <MainTemplate>
      {(loading || playersLoading || clubsLoading) && <Loader />}
      <PageHeading title="Zarządzanie dostępami" />
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
    </MainTemplate>
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
