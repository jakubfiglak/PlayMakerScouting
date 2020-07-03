import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import PlayersTable from '../players/PlayersTable';
import TabPanel from '../common/TabPanel/TabPanel';
import usePlayersState from '../../context/players/usePlayersState';
import Loader from '../common/Loader/Loader';
import PlayersFilterForm from '../players/PlayersFilterForm';

const PlayersContent = () => {
  const playersContext = usePlayersState();

  const { loading, getPlayers, playersData } = playersContext;

  const [value, setValue] = useState(0);

  const handleChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: number,
  ) => {
    setValue(newValue);
  };

  return (
    <>
      {loading && <Loader />}
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="players">
          <Tab
            label="Baza zawodników"
            id="players-0"
            aria-controls="players-0"
          />
          <Tab label="Dodaj/edytuj" id="players-1" aria-controls="players-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} title="players">
        <PlayersFilterForm />
        <PlayersTable getPlayers={getPlayers} playersData={playersData} />
      </TabPanel>
      <TabPanel value={value} index={1} title="players">
        Item Two
      </TabPanel>
    </>
  );
};

export default PlayersContent;
