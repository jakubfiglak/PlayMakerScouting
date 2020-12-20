import React, { useState, useEffect } from 'react';
// MUI components
import {
  AppBar,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Box,
} from '@material-ui/core';
// Custom components
import { ClubsTable } from '../tables';
import { ClubsFilterForm, ClubsForm } from '../forms';
import { TabPanel, Loader } from '../common';
// Types
import { Club, ClubsFilterData } from '../../types/clubs';
// Hooks
import { useTabs, useTable, useAlert } from '../../hooks';
import { useClubsState } from '../../context';

export const ClubsContent = () => {
  const {
    loading,
    getClubs,
    clubsData,
    setCurrent,
    error,
    message,
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
          <Tab label="Baza klubów" id="clubs-0" aria-controls="clubs-0" />
          <Tab label="Dodaj/edytuj" id="clubs-1" aria-controls="clubs-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="clubs">
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
        <ClubsForm />
      </TabPanel>
    </>
  );
};
