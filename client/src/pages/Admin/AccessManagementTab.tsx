// Custom components
import { GrantAccessForm } from './GrantAccessForm';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useTeams } from '../../hooks/teams';
import { useUsersList } from '../../hooks/users';
import { useClubsList } from '../../hooks/clubs';
import { useReportsList } from '../../hooks/reports';
import { usePlayersList } from '../../hooks/players';
import { useNotesList } from '../../hooks/notes';
import { useMatchesList } from '../../hooks/matches';
import {
  useAccessControlLists,
  useGrantAccess,
} from '../../hooks/accessControlLists';

export const AccessManagementTab = () => {
  const { data: users, isLoading: usersLoading } = useUsersList();
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { data: reports, isLoading: reportsLoading } = useReportsList();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: notes, isLoading: notesLoading } = useNotesList();
  const { data: matches, isLoading: matchesLoading } = useMatchesList();
  const {
    data: accessControlLists,
    isLoading: accessControlListsLoading,
  } = useAccessControlLists();
  const {
    mutate: grantAccess,
    isLoading: grantAccessLoading,
  } = useGrantAccess();

  const isLoading =
    usersLoading ||
    teamsLoading ||
    clubsLoading ||
    reportsLoading ||
    playersLoading ||
    notesLoading ||
    matchesLoading ||
    grantAccessLoading ||
    accessControlListsLoading;

  return (
    <>
      {isLoading ? <Loader /> : null}
      <PageHeading title="Zarządzanie dostępami" />
      <GrantAccessForm
        users={users || []}
        teams={teams || []}
        clubs={clubs || []}
        reports={reports || []}
        players={players || []}
        matches={matches || []}
        notes={notes || []}
        accessControlLists={accessControlLists || []}
        onSubmit={grantAccess}
      />
    </>
  );
};
