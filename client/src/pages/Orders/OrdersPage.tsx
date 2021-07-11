import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { OrdersForm } from './OrdersForm';
import { OrdersFilterForm } from './OrdersFilterForm';
import { OrdersTable } from './OrdersTable';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import { OrderFormData, OrdersFilterData } from '../../types/orders';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { usePlayersList, useCreatePlayer } from '../../hooks/players';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useOrders, useRejectOrder } from '../../hooks/orders';
import { useClubsList } from '../../hooks/clubs';
import { useOrdersState } from '../../context/orders/useOrdersState';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

export const OrdersPage = () => {
  const {
    loading,
    getOrders,
    addOrder,
    acceptOrder,
    ordersData,
    closeOrder,
    deleteOrder,
  } = useOrdersState();

  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const {
    mutate: createPlayer,
    isLoading: createPlayerLoading,
  } = useCreatePlayer();

  const user = useAuthenticatedUser();

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

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: 'open',
    createdAfter: formatDateObject(yearFromNow),
    createdBefore: formatDateObject(tomorrow),
  });

  const { data: orders, isLoading: ordersLoading } = useOrders({
    page: page + 1,
    limit: rowsPerPage,
    order,
    sort: sortBy,
    filters,
  });

  const { mutate: rejectOrder } = useRejectOrder();

  const isAdmin = user.role === 'admin';

  const handleAddOrder = (data: OrderFormData) => {
    addOrder(data);
    setActiveTab(0);
  };

  return (
    <MainTemplate>
      {(ordersLoading ||
        playersLoading ||
        clubsLoading ||
        createPlayerLoading) && <Loader />}
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
        <OrdersFilterForm playersData={players || []} setFilters={setFilters} />
        <OrdersTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={orders?.totalDocs || 0}
          orders={orders?.docs || []}
          onAcceptOrderClick={acceptOrder}
          onCloseOrderClick={closeOrder}
          onDeleteOrderClick={deleteOrder}
          onRejectOrderClick={rejectOrder}
          areAdminOptionsEnabled={isAdmin}
        />
      </TabPanel>
      {isAdmin && (
        <TabPanel value={activeTab} index={1} title="orders-form">
          <PageHeading title="Tworzenie nowego zlecenia" />
          <OrdersForm
            playersData={players || []}
            onSubmit={handleAddOrder}
            onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
          />
          <AddPlayerModal
            clubsData={clubs || []}
            onClose={() => setIsAddPlayerModalOpen(false)}
            onSubmit={createPlayer}
            open={isAddPlayerModalOpen}
          />
        </TabPanel>
      )}
    </MainTemplate>
  );
};
