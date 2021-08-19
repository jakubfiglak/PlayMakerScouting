import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { MatchesFilterForm } from './MatchesFilterForm';
import { MatchesTable } from './MatchesTable';
import { MatchesTableRow } from './MatchesTableRow';
import { MatchesForm } from './MatchesForm';
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
} from '../../hooks/matches';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
// Types
import { Match, MatchesFilterData, MatchDTO } from '../../types/matches';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

const initialFilters: MatchesFilterData = {
  club: '',
  afterDate: formatDateObject(yearFromNow),
  beforeDate: formatDateObject(tomorrow),
};

export const MatchesPage = () => {
  const { setAlert } = useAlertsState();
  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('matchesTable');

  const [filters, setFilters] = useLocalStorage<MatchesFilterData>({
    key: 'matchesFilters',
    initialValue: initialFilters,
  });

  function handleSetFilters(newFilters: MatchesFilterData) {
    setFilters(newFilters);
    handleChangePage(null, 0);
  }

  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  const { data: matches, isLoading: matchesLoading } = useMatches({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });
  const {
    mutate: createMatch,
    isLoading: createMatchLoading,
  } = useCreateMatch();
  const { mutate: updateMatch, isLoading: updateMatchLoading } = useUpdateMatch(
    currentMatch?.id || '',
  );
  const {
    mutate: deleteMatch,
    isLoading: deleteMatchLoading,
  } = useDeleteMatch();

  const handleEditClick = (match: Match) => {
    setCurrentMatch(match);
    setActiveTab(1);
  };

  const handleSubmit = (data: MatchDTO) => {
    if (currentMatch) {
      updateMatch(data);
      setActiveTab(0);
    } else {
      createMatch(data);
      setActiveTab(0);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    setCurrentMatch(null);
  };

  const isLoading =
    clubsLoading ||
    matchesLoading ||
    createMatchLoading ||
    updateMatchLoading ||
    deleteMatchLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="matches">
          <Tab label="Mecze" id="matches-0" aria-controls="matches-0" />
          <Tab label="Dodaj/edytuj" id="matches-1" aria-controls="matches-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="matches">
        <PageHeading title="Baza meczów" />
        <MatchesFilterForm
          clubsData={clubs || []}
          filters={filters}
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
        <MatchesTable
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
        </MatchesTable>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <PageHeading
          title={currentMatch ? 'Edycja meczu' : 'Tworzenie nowego meczu'}
        />

        <MatchesForm
          clubsData={clubs || []}
          current={currentMatch}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        />
      </TabPanel>
    </MainTemplate>
  );
};
