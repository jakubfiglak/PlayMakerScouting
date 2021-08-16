import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { NotesTable } from './NotesTable';
import { NotesTableRow } from './NotesTableRow';
import { NotesFilterForm } from './NotesFilterForm';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
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
import { useNotes } from '../../hooks/notes';
import { usePlayersList } from '../../hooks/players';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Match, MatchesFilterData, MatchDTO } from '../../types/matches';
import { NotesFilterData, Note } from '../../types/notes';
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

  const [currentNote, setCurrentNote] = useState<Note | null>(null);

  const { data: notes, isLoading: notesLoading } = useNotes({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });
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

  const handleEditClick = (note: Note) => {
    setCurrentNote(note);
    setActiveTab(1);
  };

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

  const isLoading =
    notesLoading || clubsLoading || playersLoading || matchesLoading;

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
        <NotesTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={notes?.totalDocs || 0}
          actions
        >
          {notes
            ? notes.docs.map((note) => (
                <NotesTableRow
                  key={note.id}
                  note={note}
                  onEditClick={handleEditClick}
                  onDeleteClick={(n) => console.log(n)}
                  isMenuActive
                  isEditOptionEnabled={
                    user.role === 'admin' || user.id === note.author.id
                  }
                  isDeleteOptionEnabled={
                    user.role === 'admin' || user.id === note.author.id
                  }
                />
              ))
            : null}
        </NotesTable>
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
