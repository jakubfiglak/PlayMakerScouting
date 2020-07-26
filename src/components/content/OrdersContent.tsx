import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab, Grid } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
// Types
import { Order } from '../../types/orders';
// Hooks
import { useOrdersState, useSimplifiedDataState } from '../../context';
import { useTabs } from '../../hooks';
// Utils & data
import { formatDateObject } from '../../utils';

export const OrdersContent = () => {
  const ordersContext = useOrdersState();
  const simplifiedDataContext = useSimplifiedDataState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const { loading, getOrders, ordersData, deleteOrder } = ordersContext;

  const {
    loading: simpleDataLoading,
    getClubs,
    clubsData,
  } = simplifiedDataContext;

  useEffect(() => {
    getClubs();
    getOrders();
  }, []);

  return (
    <>
      {(loading || simpleDataLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="orders">
          <Tab label="Baza zleceń" id="orders-0" aria-controls="orders-0" />
          <Tab label="Dodaj" id="orders-1" aria-controls="orders-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="matches">
        <Grid container spacing={2}>
          {/* {matchesData.data.map((match) => (
            <Grid item xs={12} sm={6} md={3} key={match._id}>
              <MatchCard
                match={match}
                deleteMatch={deleteMatch}
                handleSetCurrent={handleSetCurrent}
              />
            </Grid>
          ))} */}
        </Grid>
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="orders" />
    </>
  );
};
