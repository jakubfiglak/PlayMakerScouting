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
// Types
import { Club, ClubsFilterData, ClubsFormData } from '../../types/clubs';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useAlert } from '../../hooks/useAlert';
import { useClubsState } from '../../context/clubs/useClubsState';

export const ClubsPage = () => {
  const {
    loading,
    current,
    getClubs,
    addClub,
    editClub,
    clubsData,
    setCurrent,
    error,
    message,
    clearCurrent,
    clearErrors,
    clearMessage,
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

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

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
      editClub(current._id, data);
      clearCurrent();
      setActiveTab(0);
    } else {
      addClub(data);
      setActiveTab(0);
    }
  };

  useEffect(
    () => {
      getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, rowsPerPage, sortBy, order, filters],
  );

  return (
    <>
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

        <ClubsForm current={current} onSubmit={handleSubmit} />
      </TabPanel>
    </>
  );
};
