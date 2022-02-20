import { useState } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { OrdersForm } from './OrdersForm';
import { OrdersFilterForm } from './OrdersFilterForm';
import { OrdersTable } from './OrdersTable';
import { OrdersTableRow } from './OrdersTableRow';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
// Types
import { OrderDTO, OrdersFilterData } from '../../types/orders';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { usePlayersList } from '../../hooks/players';
import {
  useAcceptOrder,
  useRejectOrder,
  useDeleteOrder,
  useCloseOrder,
  useOrders,
  useCreateOrder,
} from '../../hooks/orders';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useLocalStorage } from '../../hooks/useLocalStorage';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

const initialFilters: OrdersFilterData = {
  scout: 'all',
  player: '',
  status: 'open',
  createdAfter: formatDateObject(yearFromNow),
  createdBefore: formatDateObject(tomorrow),
};

export const OrdersPage = () => {
  const { data: players, isLoading: playersLoading } = usePlayersList();

  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('ordersTable');

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const [filters, setFilters] = useLocalStorage<OrdersFilterData>({
    key: 'ordersFilters',
    initialValue: initialFilters,
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

  const handleAddOrder = (data: OrderDTO) => {
    createOrder(data);
    setActiveTab(0);
  };

  const isLoading =
    playersLoading ||
    ordersLoading ||
    createOrderLoading ||
    rejectOrderLoading ||
    acceptOrderLoading ||
    deleteOrderLoading ||
    closeOrderLoading;

  return (
    <>
      {isLoading && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="orders">
          <Tab label="Zlecenia" id="orders-0" aria-controls="orders-0" />
          <Tab label="Stwórz zlecenie" id="orders-1" aria-controls="orders-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="orders">
        <PageHeading title="Baza zleceń" />
        <OrdersFilterForm
          playersData={players || []}
          filters={filters}
          onFilter={setFilters}
          onClearFilters={() => setFilters(initialFilters)}
        />
        <OrdersTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={orders?.totalDocs || 0}
        >
          {orders
            ? orders.docs.map((orderData) => (
                <OrdersTableRow
                  key={orderData.id}
                  order={orderData}
                  onAcceptOrderClick={acceptOrder}
                  onCloseOrderClick={closeOrder}
                  onRejectOrderClick={rejectOrder}
                  onDeleteOrderClick={deleteOrder}
                  areAdminOptionsEnabled
                  canRejectOrder={
                    user.id !== orderData.scout?.id &&
                    orderData.status !== 'closed'
                  }
                  canCreateReport={
                    orderData.status === 'accepted' &&
                    orderData.scout?.id === user.id
                  }
                />
              ))
            : null}
        </OrdersTable>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="orders-form">
        <PageHeading title="Tworzenie nowego zlecenia" />
        <OrdersForm
          playersData={players || []}
          onSubmit={handleAddOrder}
          onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
        />
        <AddPlayerModal
          onClose={() => setIsAddPlayerModalOpen(false)}
          open={isAddPlayerModalOpen}
        />
      </TabPanel>
    </>
  );
};
