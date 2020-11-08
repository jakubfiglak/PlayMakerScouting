import React, { useState, useEffect, ChangeEvent } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
// Custom components
import { TabPanel, Loader } from '../common';
import { OrdersForm, OrdersFilterForm } from '../forms';
import { OrdersGrid } from '../orders';
// Types
import { OrdersFilterData } from '../../types/orders';
// Hooks
import {
  useOrdersState,
  useSimplifiedDataState,
  useAuthState,
} from '../../context';
import { useTabs, useAlert } from '../../hooks';
// Styles
import { useStyles } from './styles';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils';

export const OrdersContent = () => {
  const classes = useStyles();

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

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: 'open',
    createdAfter: formatDateObject(yearFromNow),
    createdBefore: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getPlayers();
    getOrders(filters, page);
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const isAdmin = user?.role === 'admin';

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (user?.role === 'scout') {
    return <p>Aby mieć dostęp do zleceń, zostań scoutem Playmakera!</p>;
  }

  return (
    <>
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
      <TabPanel value={activeTab} index={0} title="matches">
        <OrdersFilterForm playersData={playersData} setFilters={setFilters} />
        <OrdersGrid
          ordersData={ordersData}
          deleteOrder={deleteOrder}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
        />
        {ordersData.docs.length > 0 && (
          <div className={classes.paginationContainer}>
            <Pagination
              count={ordersData.totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </div>
        )}
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
    </>
  );
};
