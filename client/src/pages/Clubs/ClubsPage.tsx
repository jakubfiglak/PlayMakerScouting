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

  const handleEditCancelClick = () => {
    clearCurrent();
    setAlert({ msg: 'Anulowano edycję', type: 'warning' });
  };

  useEffect(
    () => {
      getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage, sortBy, order, filters],
  );

  return (
    <MainTemplate>
      {loading && <Loader />}
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
          clubs={clubsData.docs}
          total={clubsData.totalDocs}
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
          onEditCancelClick={handleEditCancelClick}
        />
      </TabPanel>
    </MainTemplate>
  );
};
