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
import { useTabs } from '../../hooks';

export const PlayersContent = () => {
  const playersContext = usePlayersState();
  const simplifiedDataContext = useSimplifiedDataState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    loading,
    getPlayers,
    playersData,
    deletePlayer,
    setCurrent,
  } = playersContext;

  const {
    loading: simpleDataLoading,
    getClubs,
    clubsData,
  } = simplifiedDataContext;

  const [filters, setFilters] = useState<PlayersFilterData>({
    name: '',
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
          getPlayers={getPlayers}
          playersData={playersData}
          filters={filters}
          deletePlayer={deletePlayer}
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PlayersForm clubsData={clubsData} />
      </TabPanel>
    </>
  );
};
