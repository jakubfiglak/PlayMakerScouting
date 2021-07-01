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
import { PlayerAccessForm } from './PlayerAccessForm';
import { ClubAccessForm } from './ClubAccessForm';
import { TeamsTable } from './TeamsTable';
import { UsersTable } from './UsersTable';
import { UsersFilterForm } from './UsersFilterForm';
import { TeamDeleteConfirmationModal } from './TeamDeleteConfirmationModal';
import { AssignPlaymakerRoleConfirmationModal } from './AssignPlaymakerRoleConfirmationModal';
import { MainTemplate } from '../../templates/MainTemplate';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { TabPanel } from '../../components/TabPanel';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useUsersState } from '../../context/users/useUsersState';
import { useTabs } from '../../hooks/useTabs';
import { TeamsFormModal } from './TeamsFormModal';
// Types
import { Team } from '../../types/teams';
import { UserFilterData } from '../../types/users';
import { User } from '../../types/auth';

export const AdminPage = () => {
  const classes = useStyles();
  const [activeTab, handleTabChange] = useTabs();
  const [isTeamsModalOpen, setTeamsModalOpen] = useState(false);
  const [
    isTeamDeleteConfirmationModalOpen,
    setTeamDeleteConfirmationModalOpen,
  ] = useState(false);
  const [
    isAssignPlaymakerRoleConfirmationModalOpen,
    setAssignPlaymakerRoleConfirmationModalOpen,
  ] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [filters, setFilters] = useState<UserFilterData>({
    lastName: '',
    voivodeship: '',
    city: '',
    role: '',
  });

  function handleDeleteTeamClick(team: Team) {
    setCurrentTeam(team);
    setTeamDeleteConfirmationModalOpen(true);
  }

  function handleAssignPlaymakerRoleClick(user: User) {
    setCurrentUser(user);
    setAssignPlaymakerRoleConfirmationModalOpen(true);
  }

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
          aria-label="admin-panel"
        >
          <Tab label="Użytkownicy" id="users" aria-controls="users" />
          <Tab label="Zespoły" id="teams" aria-controls="teams" />
          <Tab
            label="Dostępy"
            id="accessmanagement"
            aria-controls="accessmanagement"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="users">
        <PageHeading title="Użytkownicy" />
        <UsersFilterForm setFilters={setFilters} />
        <UsersTable
          filters={filters}
          onAssignRoleClick={handleAssignPlaymakerRoleClick}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="teams">
        <PageHeading title="Zespoły scoutów" />
        <TeamsTable onDeleteClick={handleDeleteTeamClick} />
        <TeamsFormModal
          onClose={() => {
            setTeamsModalOpen(false);
          }}
          open={isTeamsModalOpen}
        />
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => setTeamsModalOpen(true)}
        >
          <AddIcon />
        </Fab>
      </TabPanel>
      <TabPanel value={activeTab} index={2} title="accessmanagement">
        <PageHeading title="Zarządzanie dostępami" />
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

      <TeamDeleteConfirmationModal
        team={currentTeam}
        open={isTeamDeleteConfirmationModalOpen}
        handleClose={() => {
          setTeamDeleteConfirmationModalOpen(false);
          setCurrentTeam(null);
        }}
      />
      <AssignPlaymakerRoleConfirmationModal
        user={currentUser}
        open={isAssignPlaymakerRoleConfirmationModalOpen}
        handleClose={() => {
          setAssignPlaymakerRoleConfirmationModalOpen(false);
        }}
      />
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
