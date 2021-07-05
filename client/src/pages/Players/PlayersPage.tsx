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
import { usePlayers } from '../../hooks/players';

export const PlayersPage = () => {
  const { setAlert } = useAlertsState();

  const {
    getPlayers,
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

  const { data: players, isLoading: playersLoading } = usePlayers({
    page: page + 1,
    limit: rowsPerPage,
    order,
    sort: sortBy,
    filters,
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
      editPlayer(current.id, data);
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

  const handleEditCancelClick = () => {
    clearCurrent();
    setAlert({ msg: 'Anulowano edycję', type: 'warning' });
  };

  return (
    <MainTemplate>
      {(playersLoading || clubsLoading) && <Loader />}
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
          players={players?.docs || []}
          total={players?.totalDocs || 0}
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
          onEditCancelClick={handleEditCancelClick}
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
