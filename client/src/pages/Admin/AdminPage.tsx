import React, { useEffect, useState } from 'react';
// MUI components
import {
  Typography,
  makeStyles,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Tabs,
  Tab,
  Fab,
} from '@material-ui/core';
// MUI icons
import {
  ExpandMore as AccordionIcon,
  Add as AddIcon,
} from '@material-ui/icons';
// Custom components
import { AssignPlaymakerRoleForm } from './AssignPlaymakerRoleForm';
import { PlayerAccessForm } from './PlayerAccessForm';
import { ClubAccessForm } from './ClubAccessForm';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { TabPanel } from '../../components/TabPanel';
import { MainTemplate } from '../../templates/MainTemplate';
import { UsersMultipleSelect } from '../../components/selects/UsersMultipleSelect';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useUsersState } from '../../context/users/useUsersState';
import { useTabs } from '../../hooks/useTabs';
import { TeamsFormModal } from './TeamsFormModal';

export const AdminPage = () => {
  const classes = useStyles();
  const [activeTab, handleTabChange] = useTabs();
  const [isTeamsModalOpen, setTeamsModalOpen] = useState(false);

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
      <AppBar position="static">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="accessmanagement"
        >
          <Tab
            label="Dostępy"
            id="accessmanagement"
            aria-controls="accessmanagement"
          />
          <Tab label="Zespoły" id="teams" aria-controls="teams" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="accessmanagement">
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
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="teams">
        <PageHeading title="Zespoły scoutów" />
        <TeamsFormModal
          current={null}
          onClose={() => {
            setTeamsModalOpen(false);
          }}
          open={isTeamsModalOpen}
          users={usersList}
        />
        {/* <UsersMultipleSelect users={usersList} /> */}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => setTeamsModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </TabPanel>
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
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
}));
