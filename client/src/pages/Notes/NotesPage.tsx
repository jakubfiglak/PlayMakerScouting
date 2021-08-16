import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
import { NotesFilterForm } from './NotesFilterForm';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubsList } from '../../hooks/clubs';
import {
  useMatches,
  useCreateMatch,
  useUpdateMatch,
  useDeleteMatch,
  useMatchesList,
} from '../../hooks/matches';
import { usePlayersList } from '../../hooks/players';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Match, MatchesFilterData, MatchDTO } from '../../types/matches';
import { NotesFilterData } from '../../types/notes';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

const initialFilters: NotesFilterData = {
  player: '',
  club: '',
  match: '',
};

export const NotesPage = () => {
  const { setAlert } = useAlertsState();
  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const { data: matches, isLoading: matchesLoading } = useMatchesList();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('notesTable');

  const [filters, setFilters] = useLocalStorage<NotesFilterData>({
    key: 'notesFilters',
    initialValue: initialFilters,
  });

  function handleSetFilters(newFilters: NotesFilterData) {
    console.log(newFilters);
    setFilters(newFilters);
    handleChangePage(null, 0);
  }

  // const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  // const { data: matches, isLoading: matchesLoading } = useMatches({
  //   page: page + 1,
  //   limit: rowsPerPage,
  //   sort: sortBy,
  //   order,
  //   filters,
  // });
  // const {
  //   mutate: createMatch,
  //   isLoading: createMatchLoading,
  // } = useCreateMatch();
  // const { mutate: updateMatch, isLoading: updateMatchLoading } = useUpdateMatch(
  //   currentMatch?.id || '',
  // );
  // const {
  //   mutate: deleteMatch,
  //   isLoading: deleteMatchLoading,
  // } = useDeleteMatch();

  // const handleEditClick = (match: Match) => {
  //   setCurrentMatch(match);
  //   setActiveTab(1);
  // };

  // const handleSubmit = (data: MatchDTO) => {
  //   if (currentMatch) {
  //     updateMatch(data);
  //     setActiveTab(0);
  //   } else {
  //     createMatch(data);
  //     setActiveTab(0);
  //   }
  // };

  // const handleFormReset = () => {
  //   setActiveTab(0);
  //   setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
  //   setCurrentMatch(null);
  // };

  const isLoading = clubsLoading || playersLoading || matchesLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="notes">
          <Tab label="Notatki" id="notes-0" aria-controls="notes-0" />
          <Tab label="Dodaj/edytuj" id="notes-1" aria-controls="notes-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="notes">
        <PageHeading title="Baza notatek" />
        <NotesFilterForm
          playersData={players || []}
          clubsData={clubs || []}
          matchesData={matches || []}
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
        {/* <MatchesTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={matches?.totalDocs || 0}
          actions
        >
          {matches
            ? matches.docs.map((match) => (
                <MatchesTableRow
                  key={match.id}
                  match={match}
                  onEditClick={handleEditClick}
                  onDeleteClick={deleteMatch}
                  isMenuActive
                  isEditOptionEnabled={
                    user.role === 'admin' || user.id === match.author
                  }
                  isDeleteOptionEnabled={
                    user.role === 'admin' || user.id === match.author
                  }
                />
              ))
            : null}
        </MatchesTable> */}
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="notes">
        {/* <PageHeading
          title={currentMatch ? 'Edycja meczu' : 'Tworzenie nowego meczu'}
        />

        <MatchesForm
          clubsData={clubs || []}
          current={currentMatch}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        /> */}
      </TabPanel>
    </MainTemplate>
  );
};
