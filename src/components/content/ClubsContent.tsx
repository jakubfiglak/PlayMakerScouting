import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../common/TabPanel/TabPanel';
import ClubsTable from '../tables/clubs/ClubsTable';
import Loader from '../common/Loader/Loader';
import useTabs from '../../hooks/useTabs';
import useClubsState from '../../context/clubs/useClubsState';
import { Club, ClubsFilterData } from '../../types/clubs';
import ClubsFilterForm from '../forms/clubs/ClubsFilterForm';
import ClubsForm from '../forms/clubs/ClubsForm';

const ClubsContent = () => {
  const clubsContext = useClubsState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const { loading, getClubs, clubsData, deleteClub, setCurrent } = clubsContext;

  const [filters, setFilters] = useState<ClubsFilterData>({
    name: '',
    division: '',
    voivodeship: '',
  });

  const handleSetCurrent = (club: Club) => {
    setCurrent(club);
    setActiveTab(1);
  };

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
          getClubs={getClubs}
          clubsData={clubsData}
          filters={filters}
          deleteClub={deleteClub}
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="clubs">
        <ClubsForm />
      </TabPanel>
    </>
  );
};

export default ClubsContent;
