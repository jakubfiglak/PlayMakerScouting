import React, { useState, useEffect } from 'react';
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
import { Club, ClubsFilterData, ClubsFormData } from '../../types/clubs';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubs } from '../../hooks/clubs';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useAlertsState } from '../../context/alerts/useAlertsState';

export const ClubsPage = () => {
  const { setAlert } = useAlertsState();

  const {
    loading,
    current,
    getClubs,
    addClub,
    editClub,
    clubsData,
    setCurrent,
    clearCurrent,
  } = useClubsState();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  const [filters, setFilters] = useState<ClubsFilterData>({
    name: '',
    division: '',
    voivodeship: '',
  });

  const { data: clubs, isLoading } = useClubs({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });

  const handleSetCurrent = (club: Club) => {
    setCurrent(club);
    setActiveTab(1);
  };

  const handleSubmit = (data: ClubsFormData) => {
    if (current) {
      editClub(current.id, data);
      setActiveTab(0);
    } else {
      addClub(data);
      setActiveTab(0);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    clearCurrent();
  };

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="clubs">
          <Tab label="Kluby" id="clubs-0" aria-controls="clubs-0" />
          <Tab label="Dodaj/edytuj" id="clubs-1" aria-controls="clubs-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="clubs">
        <PageHeading title="Baza klubów" />
        <ClubsFilterForm setFilters={setFilters} />
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
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <PageHeading
          title={current ? 'Edycja klubu' : 'Tworzenie nowego klubu'}
        />

        <ClubsForm
          current={current}
          onSubmit={handleSubmit}
          onCancelClick={handleFormReset}
        />
      </TabPanel>
    </MainTemplate>
  );
};
