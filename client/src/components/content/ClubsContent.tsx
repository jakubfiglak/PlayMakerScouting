import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { ClubsTable } from '../tables';
import { ClubsFilterForm, ClubsForm } from '../forms';
import { TabPanel, Loader } from '../common';
// Types
import { Club, ClubsFilterData } from '../../types/clubs';
// Hooks
import { useTabs, useTable } from '../../hooks';
import { useClubsState } from '../../context';

export const ClubsContent = () => {
  const clubsContext = useClubsState();

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

  const {
    loading,
    getClubs,
    clubsData: { docs, totalDocs },
    myClubsData,
    setCurrent,
  } = clubsContext;

  const [filters, setFilters] = useState<ClubsFilterData>({
    name: '',
    division: '',
    voivodeship: '',
  });

  const handleSetCurrent = (club: Club) => {
    setCurrent(club);
    setActiveTab(1);
  };

  useEffect(() => {
    getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    getClubs(page + 1, rowsPerPage, sortBy, order, filters, true);
    console.log(myClubsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, rowsPerPage, sortBy, order, filters]);

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
          clubs={docs}
          total={totalDocs}
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <ClubsForm />
      </TabPanel>
    </>
  );
};
