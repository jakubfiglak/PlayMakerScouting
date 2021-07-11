import React, { useState } from 'react';
// MUI components
import { makeStyles, Fab } from '@material-ui/core';
// MUI icons
import { Add as AddIcon } from '@material-ui/icons';
// Custom components
import { TeamsTable } from './TeamsTable';
import { TeamDeleteConfirmationModal } from './TeamDeleteConfirmationModal';
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { TeamsFormModal } from './TeamsFormModal';
// Types
import { Team } from '../../types/teams';

export const TeamsTab = () => {
  const classes = useStyles();
  const [isTeamsModalOpen, setTeamsModalOpen] = useState(false);
  const [
    isTeamDeleteConfirmationModalOpen,
    setTeamDeleteConfirmationModalOpen,
  ] = useState(false);

  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);

  function handleDeleteTeamClick(team: Team) {
    setCurrentTeam(team);
    setTeamDeleteConfirmationModalOpen(true);
  }

  return (
    <>
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
      <TeamDeleteConfirmationModal
        team={currentTeam}
        open={isTeamDeleteConfirmationModalOpen}
        handleClose={() => {
          setTeamDeleteConfirmationModalOpen(false);
          setCurrentTeam(null);
        }}
      />
    </>
  );
};

const useStyles = makeStyles(() => ({
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
}));
