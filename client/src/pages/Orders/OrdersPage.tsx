import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { OrdersForm } from './OrdersForm';
import { OrdersFilterForm } from './OrdersFilterForm';
import { OrdersGrid } from './OrdersGrid';
import { OrdersTable } from './OrdersTable';
import { MainTemplate } from '../../templates/MainTemplate';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
// Types
import { OrdersFilterData } from '../../types/orders';
// Hooks
import { useTabs, useAlert } from '../../hooks';
import { useTable } from '../../hooks/useTable';
import { useAuthState } from '../../context/auth/useAuthState';
import { useOrdersState } from '../../context/orders/useOrdersState';
import { useSimplifiedDataState } from '../../context/simplifiedData/useSimplifiedDataState';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils';

export const OrdersPage = () => {
  const {
    loading,
    getOrders,
    getMyOrders,
    acceptOrder,
    ordersData,
    myOrdersData,
    deleteOrder,
    closeOrder,
    error,
    message,
    clearErrors,
    clearMessage,
  } = useOrdersState();

  const {
    loading: simpleDataLoading,
    getPlayers,
    playersData,
  } = useSimplifiedDataState();

  const { loading: userLoading, user } = useAuthState();

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

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: 'open',
    createdAfter: formatDateObject(yearFromNow),
    createdBefore: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getPlayers();
    getOrders(filters, 1);
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const isAdmin = user?.role === 'admin';

  if (user?.role === 'scout') {
    return <p>Aby mieć dostęp do zleceń, zostań scoutem Playmakera!</p>;
  }

  return (
    <MainTemplate>
      {(loading || simpleDataLoading || userLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="orders">
          <Tab label="Baza zleceń" id="orders-0" aria-controls="orders-0" />
          <Tab label="Moje zlecenia" id="orders-1" aria-controls="orders-1" />
          {isAdmin && (
            <Tab
              label="Stwórz zlecenie"
              id="orders-2"
              aria-controls="orders-2"
            />
          )}
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="orders">
        <OrdersFilterForm playersData={playersData} setFilters={setFilters} />
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
        />
        <OrdersGrid
          ordersData={ordersData}
          deleteOrder={deleteOrder}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="my-orders">
        <OrdersGrid
          ordersData={myOrdersData}
          deleteOrder={deleteOrder}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
        />
      </TabPanel>
      {isAdmin && (
        <TabPanel value={activeTab} index={2} title="orders-form">
          <OrdersForm playersData={playersData} />
        </TabPanel>
      )}
    </MainTemplate>
  );
};
