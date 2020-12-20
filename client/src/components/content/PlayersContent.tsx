import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { PlayersTable } from '../tables';
import { PlayersFilterForm, PlayersForm } from '../forms';
import { TabPanel, Loader } from '../common';
// Types
import { PlayersFilterData, Player } from '../../types/players';
// Hooks
import { usePlayersState, useSimplifiedDataState } from '../../context';
import { useTabs, useTable, useAlert } from '../../hooks';

export const PlayersContent = () => {
  const {
    loading,
    getPlayers,
    playersData: { docs, totalDocs },
    setCurrent,
    message,
    error,
    clearMessage,
    clearErrors,
  } = usePlayersState();

  const {
    loading: simpleDataLoading,
    getClubs,
    clubsData,
  } = useSimplifiedDataState();

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

  const [filters, setFilters] = useState<PlayersFilterData>({
    lastName: '',
    club: '',
    position: '',
  });

  const handleSetCurrent = (player: Player) => {
    setCurrent(player);
    setActiveTab(1);
  };

  useEffect(() => {
    getClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  return (
    <>
      {(loading || simpleDataLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="players">
          <Tab
            label="Baza zawodników"
            id="players-0"
            aria-controls="players-0"
          />
          <Tab label="Dodaj/edytuj" id="players-1" aria-controls="players-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="players">
        <PlayersFilterForm clubsData={clubsData} setFilters={setFilters} />
        <PlayersTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          players={docs}
          total={totalDocs}
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PlayersForm clubsData={clubsData} />
      </TabPanel>
    </>
  );
};
