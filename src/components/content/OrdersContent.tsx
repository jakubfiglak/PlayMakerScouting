import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { OrdersForm, OrdersFilterForm } from '../forms';
import { OrdersGrid, MyOrdersGrid } from '../orders';
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
import { formatDateObject, today, tomorrow } from '../../utils';

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
    status: 'all',
    createdAfter: formatDateObject(today),
    createdBefore: formatDateObject(tomorrow),
  });

  useEffect(() => {
    getPlayers();
  }, [filters]);

  const isAdmin = user?.role === 'admin';

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
          getOrders={getOrders}
          deleteOrder={deleteOrder}
          acceptOrder={acceptOrder}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="orders">
        {isAdmin ? (
          <OrdersForm playersData={playersData} />
        ) : (
          <MyOrdersGrid
            myOrdersData={myOrdersData}
            filters={filters}
            getMyOrders={getMyOrders}
            deleteOrder={deleteOrder}
            acceptOrder={acceptOrder}
          />
        )}
      </TabPanel>
    </>
  );
};
