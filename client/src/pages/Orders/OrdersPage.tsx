import React, { useState } from 'react';
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
import { OrderDTO, OrdersFilterData } from '../../types/orders';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { usePlayersList, useCreatePlayer } from '../../hooks/players';
import {
  useAcceptOrder,
  useRejectOrder,
  useDeleteOrder,
  useCloseOrder,
  useOrders,
  useCreateOrder,
} from '../../hooks/orders';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useClubsList } from '../../hooks/clubs';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

export const OrdersPage = () => {
  const { data: clubs, isLoading: clubsLoading } = useClubsList();
  const { data: players, isLoading: playersLoading } = usePlayersList();
  const {
    mutate: createPlayer,
    isLoading: createPlayerLoading,
  } = useCreatePlayer();

  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('ordersTable');

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

  const {
    mutate: createOrder,
    isLoading: createOrderLoading,
  } = useCreateOrder();
  const {
    mutate: rejectOrder,
    isLoading: rejectOrderLoading,
  } = useRejectOrder();
  const {
    mutate: acceptOrder,
    isLoading: acceptOrderLoading,
  } = useAcceptOrder();
  const {
    mutate: deleteOrder,
    isLoading: deleteOrderLoading,
  } = useDeleteOrder();
  const { mutate: closeOrder, isLoading: closeOrderLoading } = useCloseOrder();

  const isAdmin = user.role === 'admin';

  const handleAddOrder = (data: OrderDTO) => {
    createOrder(data);
    setActiveTab(0);
  };

  const isLoading =
    clubsLoading ||
    playersLoading ||
    ordersLoading ||
    createPlayerLoading ||
    createOrderLoading ||
    rejectOrderLoading ||
    acceptOrderLoading ||
    deleteOrderLoading ||
    closeOrderLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
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
