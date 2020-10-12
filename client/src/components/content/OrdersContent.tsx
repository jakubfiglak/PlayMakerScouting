import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
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
import { useTabs } from '../../hooks';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils';

export const OrdersContent = () => {
  const ordersContext = useOrdersState();
  const simplifiedDataContext = useSimplifiedDataState();
  const authContext = useAuthState();
  const [activeTab, handleTabChange] = useTabs();

  const {
    loading,
    getOrders,
    getMyOrders,
    acceptOrder,
    ordersData,
    myOrdersData,
    deleteOrder,
  } = ordersContext;

  const {
    loading: simpleDataLoading,
    getPlayers,
    playersData,
  } = simplifiedDataContext;

  const { loading: userLoading, user } = authContext;

  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: 'open',
    createdAfter: formatDateObject(yearFromNow),
    createdBefore: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getPlayers();
    getOrders(filters);
    getMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const isAdmin = user?.role === 'admin';

  if (user?.role === 'scout') {
    return <p>Aby mieć dostęp do zleceń, zostań scoutem Playmakera!</p>;
  }

  return (
    <>
      {(loading || simpleDataLoading || userLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="orders">
          <Tab label="Baza zleceń" id="orders-0" aria-controls="orders-0" />
          <Tab
            label={isAdmin ? 'Dodaj' : 'Moje zlecenia'}
            id="orders-1"
            aria-controls="orders-1"
          />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="matches">
        <OrdersFilterForm playersData={playersData} setFilters={setFilters} />
        <OrdersGrid
          ordersData={ordersData}
          filters={filters}
          deleteOrder={deleteOrder}
          acceptOrder={acceptOrder}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="orders">
        {isAdmin ? (
          <OrdersForm playersData={playersData} />
        ) : (
          <OrdersGrid
            ordersData={myOrdersData}
            filters={filters}
            deleteOrder={deleteOrder}
            acceptOrder={acceptOrder}
          />
        )}
      </TabPanel>
    </>
  );
};
