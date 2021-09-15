import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { NotesTable } from './NotesTable';
import { NotesTableRow } from './NotesTableRow';
import { NotesFilterForm } from './NotesFilterForm';
import { NotesForm } from './NotesForm';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubsList } from '../../hooks/clubs';
import { useMatchesList } from '../../hooks/matches';
import {
  useCreateNote,
  useDeleteNote,
  useNotes,
  useUpdateNote,
} from '../../hooks/notes';
import { usePlayersList } from '../../hooks/players';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { NotesFilterData, Note, NoteDTO } from '../../types/notes';

const initialFilters: NotesFilterData = {
  player: '',
  club: '',
  match: '',
};

export const NotesPage = () => {
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
  const { mutate: createNote, isLoading: createNoteLoading } = useCreateNote();
  const { mutate: updateNote, isLoading: updateNoteLoading } = useUpdateNote(
    currentNote?.id || '',
  );
  const { mutate: deleteNote, isLoading: deleteNoteLoading } = useDeleteNote();

  const handleEditClick = (note: Note) => {
    setCurrentNote(note);
    setActiveTab(1);
  };

  const handleSubmit = (data: NoteDTO) => {
    if (currentNote) {
      updateNote(data);
      setActiveTab(0);
      setCurrentNote(null);
    } else {
      createNote(data);
      setActiveTab(0);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setCurrentNote(null);
  };

  const isLoading =
    notesLoading ||
    clubsLoading ||
    playersLoading ||
    matchesLoading ||
    createNoteLoading ||
    updateNoteLoading ||
    deleteNoteLoading;

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
                  onDeleteClick={deleteNote}
                  isMenuActive
                  isEditOptionEnabled={
                    user.role === 'admin' || user.id === note.author.id
                  }
                  isDeleteOptionEnabled={
                    user.role === 'admin' || user.id === note.author.id
                  }
                  isAuthorNameClickable={user.role === 'admin'}
                />
              ))
            : null}
        </NotesTable>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="notes">
        <PageHeading
          title={
            currentNote
              ? `Edycja notatki nr ${currentNote.docNumber}`
              : 'Tworzenie nowej notatki'
          }
        />
        <NotesForm
          playersData={players || []}
          matchesData={matches || []}
          current={currentNote}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        />
      </TabPanel>
    </MainTemplate>
  );
};
