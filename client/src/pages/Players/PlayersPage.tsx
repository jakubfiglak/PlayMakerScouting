import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { PlayersForm } from './PlayersForm';
import { PlayersTable } from './PlayersTable';
import { PlayersFilterForm } from './PlayersFilterForm';
import { AddClubModal } from './AddClubModal';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import {
  PlayersFilterData,
  Player,
  PlayersFormData,
} from '../../types/players';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useClubsState } from '../../context/clubs/useClubsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useAlertsState } from '../../context/alerts/useAlertsState';

export const PlayersPage = () => {
  const { setAlert } = useAlertsState();

  const {
    loading,
    getPlayers,
    playersData: { docs, totalDocs },
    addPlayer,
    editPlayer,
    current,
    setCurrent,
    clearCurrent,
  } = usePlayersState();

  const {
    loading: clubsLoading,
    getClubsList,
    clubsList,

    addClub,
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

  const [filters, setFilters] = useState<PlayersFilterData>({
    lastName: '',
    club: '',
    position: '',
  });

  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);

  const handleSetCurrent = (player: Player) => {
    setCurrent(player);
    setActiveTab(1);
  };

  useEffect(() => {
    getClubsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getPlayers(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  const handlePlayersFormSubmit = (data: PlayersFormData) => {
    if (current) {
      editPlayer(current._id, data);
      setActiveTab(0);
    } else {
      addPlayer(data);
      setActiveTab(0);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    clearCurrent();
  };

  return (
    <MainTemplate>
      {(loading || clubsLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="players">
          <Tab label="Zawodnicy" id="players-0" aria-controls="players-0" />
          <Tab label="Dodaj/edytuj" id="players-1" aria-controls="players-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="players">
        <PageHeading title="Baza zawodników" />
        <PlayersFilterForm clubsData={clubsList} setFilters={setFilters} />
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
        <PageHeading
          title={current ? 'Edycja zawodnika' : 'Tworzenie nowego zawodnika'}
        />
        <PlayersForm
          clubsData={clubsList}
          current={current}
          onSubmit={handlePlayersFormSubmit}
          onAddClubClick={() => setIsAddClubModalOpen(true)}
          onCancelClick={handleFormReset}
        />
        <AddClubModal
          onClose={() => setIsAddClubModalOpen(false)}
          onSubmit={addClub}
          open={isAddClubModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};
