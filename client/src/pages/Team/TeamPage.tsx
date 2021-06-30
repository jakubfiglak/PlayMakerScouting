import React, { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme, Fab } from '@material-ui/core';
// MUI icons
import { Add as AddIcon } from '@material-ui/icons';
// Custom components
import { MembersTable } from './MembersTable';
import { AddMemberFormModal } from './AddMemberFormModal';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTeam } from '../../hooks/teams';
// Types
import { User } from '../../types/auth';

type ParamTypes = {
  id: string;
};

export const TeamPage = () => {
  const classes = useStyles();
  const { id } = useParams<ParamTypes>();

  const [isMemberModalOpen, setMemberModalOpen] = useState(false);
  const [
    isMemberDeleteConfirmationModalOpen,
    setMemberDeleteConfirmationModalOpen,
  ] = useState(false);
  const [currentMember, setCurrentMember] = useState<User | null>(null);

  const { data, isLoading } = useTeam(id);

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <PageHeading title={`Zespół ${data?.name}`} />
      {data ? <MembersTable users={data.members} /> : null}
      <Fab
        color="secondary"
        aria-label="add member"
        className={classes.fab}
        onClick={() => setMemberModalOpen(true)}
      >
        <AddIcon />
      </Fab>
      <AddMemberFormModal
        open={isMemberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        teamId={id}
      />
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  },
}));
