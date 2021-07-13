import React, { useState } from 'react';
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
import { PlayersFilterData, Player, PlayerDTO } from '../../types/players';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import {
  usePlayers,
  useCreatePlayer,
  useUpdatePlayer,
} from '../../hooks/players';
import { useClubsList, useCreateClub } from '../../hooks/clubs';
import { useAlertsState } from '../../context/alerts/useAlertsState';

export const PlayersPage = () => {
  const { setAlert } = useAlertsState();
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

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [filters, setFilters] = useState<PlayersFilterData>({
    lastName: '',
    club: '',
    position: '',
    bornAfter: '',
    bornBefore: '',
  });

  const { data: players, isLoading: playersLoading } = usePlayers({
    page: page + 1,
    limit: rowsPerPage,
    order,
    sort: sortBy,
    filters,
  });
  const {
    mutate: createPlayer,
    isLoading: createPlayerLoading,
  } = useCreatePlayer();
  const {
    mutate: updatePlayer,
    isLoading: updatePlayerLoading,
  } = useUpdatePlayer(currentPlayer?.id || '');
  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { mutate: createClub, isLoading: createClubLoading } = useCreateClub();

  const [isAddClubModalOpen, setIsAddClubModalOpen] = useState(false);

  const handleEditClick = (player: Player) => {
    setCurrentPlayer(player);
    setActiveTab(1);
  };

  const handleSubmit = (data: PlayerDTO) => {
    if (currentPlayer) {
      updatePlayer(data);
      setActiveTab(0);
    } else {
      createPlayer(data);
      setActiveTab(0);
      setCurrentPlayer(null);
    }
  };

  const handleFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    setCurrentPlayer(null);
  };

  return (
    <MainTemplate>
      {(playersLoading ||
        clubsLoading ||
        createClubLoading ||
        createPlayerLoading ||
        updatePlayerLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="players">
          <Tab label="Zawodnicy" id="players-0" aria-controls="players-0" />
          <Tab label="Dodaj/edytuj" id="players-1" aria-controls="players-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="players">
        <PageHeading title="Baza zawodników" />
        <PlayersFilterForm
          clubsData={clubs || []}
          filters={filters}
          setFilters={setFilters}
        />
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
          onEditClick={handleEditClick}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="players">
        <PageHeading
          title={
            currentPlayer ? 'Edycja zawodnika' : 'Tworzenie nowego zawodnika'
          }
        />
        <PlayersForm
          clubsData={clubs || []}
          current={currentPlayer}
          onSubmit={handleSubmit}
          onAddClubClick={() => setIsAddClubModalOpen(true)}
          onCancelClick={handleFormReset}
        />
        <AddClubModal
          onClose={() => setIsAddClubModalOpen(false)}
          onSubmit={createClub}
          open={isAddClubModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};
