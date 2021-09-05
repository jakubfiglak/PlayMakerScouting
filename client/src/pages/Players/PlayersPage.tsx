import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { PlayersForm } from './PlayersForm';
import { PlayersTable } from './PlayersTable';
import { PlayersTableRow } from './PlayersTableRow';
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
  useDeletePlayer,
} from '../../hooks/players';
import { useClubsList, useCreateClub } from '../../hooks/clubs';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

const initialFilters: PlayersFilterData = {
  lastName: '',
  club: '',
  position: '',
  bornAfter: '',
  bornBefore: '',
};

export const PlayersPage = () => {
  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();
  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('playersTable');

  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [filters, setFilters] = useLocalStorage<PlayersFilterData>({
    key: 'playersFilters',
    initialValue: initialFilters,
  });

  function handleSetFilters(newFilters: PlayersFilterData) {
    handleChangePage(null, 0);
    setFilters(newFilters);
  }

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
  const {
    mutate: deletePlayer,
    isLoading: deletePlayerLoading,
  } = useDeletePlayer();
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
    setCurrentPlayer(null);
  };

  const isLoading =
    playersLoading ||
    clubsLoading ||
    createClubLoading ||
    createPlayerLoading ||
    updatePlayerLoading ||
    deletePlayerLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
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
          onFilter={handleSetFilters}
          onClearFilters={() => handleSetFilters(initialFilters)}
        />
        <PlayersTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={players?.totalDocs || 0}
          actions
        >
          {players
            ? players.docs.map((player) => (
                <PlayersTableRow
                  key={player.id}
                  player={player}
                  isMenuActive
                  onEditClick={handleEditClick}
                  onDeleteClick={deletePlayer}
                  isEditOptionEnabled={
                    user.role === 'admin' || user.id === player.author
                  }
                  isDeleteOptionEnabled={
                    user.role === 'admin' || user.id === player.author
                  }
                />
              ))
            : null}
        </PlayersTable>
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
