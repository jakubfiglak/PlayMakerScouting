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
import { useTabs, useTable } from '../../hooks';
import { useClubsState, useAuthState } from '../../context';

export const ClubsContent = () => {
  const {
    loading,
    getClubs,
    clubsData,
    myClubsData,
    setCurrent,
  } = useClubsState();

  const { user, addClubToFavorites, removeClubFromFavorites } = useAuthState();

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

  const [showMyClubs, setShowMyClubs] = useState(false);

  const [filters, setFilters] = useState<ClubsFilterData>({
    name: '',
    division: '',
    voivodeship: '',
  });

  const handleCheckboxChange = () =>
    setShowMyClubs((prevShowMyClubs) => !prevShowMyClubs);

  const handleSetCurrent = (club: Club) => {
    setCurrent(club);
    setActiveTab(1);
  };

  useEffect(() => {
    // get my clubs
    if (showMyClubs) {
      getClubs(page + 1, rowsPerPage, sortBy, order, filters, true);
    } else {
      // get all clubs
      getClubs(page + 1, rowsPerPage, sortBy, order, filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters, showMyClubs]);

  const clubsWithFlag = showMyClubs
    ? myClubsData.docs.map((club) => ({
        ...club,
        isFavorite: true,
      }))
    : clubsData.docs.map((club) => ({
        ...club,
        isFavorite: user?.myClubs.includes(club._id) || false,
      }));

  const totalClubs = showMyClubs ? myClubsData.totalDocs : clubsData.totalDocs;

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
          clubs={clubsWithFlag}
          total={totalClubs}
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
