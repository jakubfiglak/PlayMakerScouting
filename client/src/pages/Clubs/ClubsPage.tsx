import React, { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { ClubsForm } from './ClubsForm';
import { ClubsFilterForm } from './ClubsFilterForm';
import { ClubsTable } from './ClubsTable';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import { Club, ClubsFilterData, ClubDTO } from '../../types/clubs';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubs, useCreateClub, useUpdateClub } from '../../hooks/clubs';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const initialFilters: ClubsFilterData = {
  name: '',
  division: '',
  voivodeship: '',
};

export const ClubsPage = () => {
  const { setAlert } = useAlertsState();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('clubsTable');

  const [filters, setFilters] = useLocalStorage<ClubsFilterData>({
    key: 'clubsFilters',
    initialValue: initialFilters,
  });

  const [currentClub, setCurrentClub] = useState<Club | null>(null);

  const { data: clubs, isLoading: clubsLoading } = useClubs({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });
  const { mutate: createClub, isLoading: createClubLoading } = useCreateClub();
  const { mutate: updateClub, isLoading: updateClubLoading } = useUpdateClub(
    currentClub?.id || '',
  );

  const handleSetCurrent = (club: Club) => {
    setCurrentClub(club);
    setActiveTab(1);
  };

  const handleSubmit = (data: ClubDTO) => {
    if (currentClub) {
      updateClub(data);
      setActiveTab(0);
    } else {
      createClub(data);
      setActiveTab(0);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    setCurrentClub(null);
  };

  return (
    <MainTemplate>
      {(clubsLoading || createClubLoading || updateClubLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="clubs">
          <Tab label="Kluby" id="clubs-0" aria-controls="clubs-0" />
          <Tab label="Dodaj/edytuj" id="clubs-1" aria-controls="clubs-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="clubs">
        <PageHeading title="Baza klubów" />
        <ClubsFilterForm
          filters={filters}
          onFilter={setFilters}
          onClearFilters={() => setFilters(initialFilters)}
        />
        <ClubsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          clubs={clubs?.docs || []}
          total={clubs?.totalDocs || 0}
          onEditClick={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <PageHeading
          title={currentClub ? 'Edycja klubu' : 'Tworzenie nowego klubu'}
        />

        <ClubsForm
          current={currentClub}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        />
      </TabPanel>
    </MainTemplate>
  );
};
