import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { useTabs, useTable } from '../../hooks';
import { useClubsState, useAuthState } from '../../context';

export const ClubsContent = () => {
  const clubsContext = useClubsState();
  const authContext = useAuthState();

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
    clubsData,
    myClubsData,
    setCurrent,
  } = clubsContext;

  const {
    loading: authLoading,
    addClubToFavorites,
    removeClubFromFavorites,
  } = authContext;

  const [showMyClubs, setShowMyClubs] = useState(false);

  const [filters, setFilters] = useState<ClubsFilterData>({
    name: '',
    division: '',
    voivodeship: '',
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) =>
    setShowMyClubs((prevShowMyClubs) => !prevShowMyClubs);

  const handleSetCurrent = (club: Club) => {
    setCurrent(club);
    setActiveTab(1);
  };

  useEffect(() => {
    // get all clubs
    getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    // get my clubs
    getClubs(page + 1, rowsPerPage, sortBy, order, filters, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, rowsPerPage, sortBy, order, filters, showMyClubs]);

  return (
    <>
      {(loading || authLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="clubs">
          <Tab label="Baza klubów" id="clubs-0" aria-controls="clubs-0" />
          <Tab label="Dodaj/edytuj" id="clubs-1" aria-controls="clubs-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="clubs">
        <Box textAlign="center">
          <FormControlLabel
            control={
              <Checkbox
                checked={showMyClubs}
                onChange={handleCheckboxChange}
                name="myClubs"
                color="primary"
              />
            }
            label="Pokaż tylko moje kluby"
          />
        </Box>
        <ClubsFilterForm setFilters={setFilters} />
        <ClubsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          clubs={showMyClubs ? myClubsData.docs : clubsData.docs}
          total={showMyClubs ? myClubsData.totalDocs : clubsData.totalDocs}
          handleSetCurrent={handleSetCurrent}
          addToFavorites={addClubToFavorites}
          removeFromFavorites={removeClubFromFavorites}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <ClubsForm />
      </TabPanel>
    </>
  );
};
