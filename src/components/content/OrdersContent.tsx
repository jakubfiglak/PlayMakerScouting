import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { OrdersForm, OrdersFilterForm } from '../forms';
import { OrderCard } from '../orders';
// Types
import { Order, OrdersFilterData } from '../../types/orders';
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
    getOrders(filters);
    getMyOrders();
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
        <Grid container spacing={2}>
          {ordersData.data.map((order) => (
            <Grid item xs={12} sm={6} md={3} key={order._id}>
              <OrderCard
                order={order}
                deleteOrder={deleteOrder}
                acceptOrder={acceptOrder}
              />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="orders">
        {isAdmin ? (
          <OrdersForm playersData={playersData} />
        ) : (
          <Grid container spacing={2}>
            {myOrdersData.map((order) => (
              <Grid item xs={12} sm={6} md={3} key={order._id}>
                <OrderCard
                  order={order}
                  deleteOrder={deleteOrder}
                  acceptOrder={acceptOrder}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </TabPanel>
    </>
  );
};
