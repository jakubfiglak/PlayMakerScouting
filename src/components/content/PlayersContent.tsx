import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import PlayersTable from '../players/PlayersTable';
import TabPanel from '../common/TabPanel/TabPanel';
import usePlayersState from '../../context/players/usePlayersState';
import useSimplifiedDataState from '../../context/simplifiedData/useSimplifiedDataState';
import Loader from '../common/Loader/Loader';
import PlayersFilterForm from '../players/PlayersFilterForm';
import { PlayersFilterData } from '../../types/players';
import useTabs from '../../hooks/useTabs';

const PlayersContent = () => {
  const playersContext = usePlayersState();
  const simplifiedDataContext = useSimplifiedDataState();
  const [activeTab, handleTabChange] = useTabs();

  const { loading, getPlayers, playersData, deletePlayer } = playersContext;
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

  useEffect(() => {
    getClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <Loader />}
      {simpleDataLoading && <Loader />}
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
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        Item Two
      </TabPanel>
    </>
  );
};

export default PlayersContent;
