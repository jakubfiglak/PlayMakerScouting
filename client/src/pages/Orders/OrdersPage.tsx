import React, { useState, useEffect } from 'react';
// MUI components
import {
  AppBar,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  makeStyles,
  Theme,
} from '@material-ui/core';
// Custom components
import { OrdersForm } from './OrdersForm';
import { OrdersFilterForm } from './OrdersFilterForm';
import { OrdersTable } from './OrdersTable';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
// Types
import { OrdersFilterData } from '../../types/orders';
// Hooks
import { useTabs, useAlert } from '../../hooks';
import { useTable } from '../../hooks/useTable';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useOrdersState } from '../../context/orders/useOrdersState';
import { useClubsState } from '../../context/clubs/useClubsState';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

export const OrdersPage = () => {
  const classes = useStyles();

  const {
    loading,
    getOrders,
    addOrder,
    acceptOrder,
    ordersData,
    closeOrder,
    error,
    message,
    clearErrors,
    clearMessage,
  } = useOrdersState();

  const {
    loading: playersLoading,
    getPlayersList,
    playersList,
    addPlayer,
    message: playersMessage,
    error: playersError,
    clearErrors: clearPlayersErrors,
    clearMessage: clearPlayersMessage,
  } = usePlayersState();

  const { loading: clubsLoading, getClubsList, clubsList } = useClubsState();

  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange] = useTabs();

  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  const [areMyOrdersChecked, setMyOrdersChecked] = useState(false);
  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const scoutId = areMyOrdersChecked ? user._id : null;

  useAlert(error, 'error', clearErrors);
  useAlert(playersError, 'error', clearPlayersErrors);
  useAlert(message, 'success', clearMessage);
  useAlert(playersMessage, 'success', clearPlayersMessage);

  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: '',
    createdAfter: formatDateObject(yearFromNow),
    createdBefore: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getOrders(page + 1, rowsPerPage, sortBy, order, filters, scoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters, scoutId]);

  useEffect(() => {
    getPlayersList();
    getClubsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAdmin = user.role === 'admin';

  return (
    <>
      {(loading || playersLoading || clubsLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="orders">
          <Tab label="Zlecenia" id="orders-0" aria-controls="orders-0" />
          {isAdmin && (
            <Tab
              label="Stwórz zlecenie"
              id="orders-1"
              aria-controls="orders-1"
            />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="orders">
        <PageHeading title="Baza zleceń" />
        <div className={classes.checkboxContainer}>
          <FormControlLabel
            control={
              <Checkbox
                checked={areMyOrdersChecked}
                onChange={(e) => {
                  setMyOrdersChecked(e.target.checked);
                }}
                name="myOrders"
                color="primary"
              />
            }
            label="Pokaż tylko moje zlecenia"
          />
        </div>
        <OrdersFilterForm playersData={playersList} setFilters={setFilters} />
        <OrdersTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={ordersData.totalDocs}
          orders={ordersData.docs}
          onAcceptOrderClick={acceptOrder}
          onCloseOrderClick={closeOrder}
          areAdminOptionsEnabled={isAdmin}
        />
      </TabPanel>
      {isAdmin && (
        <TabPanel value={activeTab} index={1} title="orders-form">
          <PageHeading title="Tworzenie nowego zlecenia" />
          <OrdersForm
            playersData={playersList}
            onSubmit={addOrder}
            onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
          />
          <AddPlayerModal
            clubsData={clubsList}
            onClose={() => setIsAddPlayerModalOpen(false)}
            onSubmit={addPlayer}
            open={isAddPlayerModalOpen}
          />
        </TabPanel>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  checkboxContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
}));
