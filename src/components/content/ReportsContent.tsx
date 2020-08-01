import React, { useState, useEffect } from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { ReportsGrid } from '../reports';
// Types
import { OrdersFilterData } from '../../types/orders';
// Hooks
import {
  useReportsState,
  useSimplifiedDataState,
  useAuthState,
} from '../../context';
import { useTabs } from '../../hooks';
// Utils & data
import { formatDateObject, today, tomorrow } from '../../utils';

export const ReportsContent = () => {
  const reportsContext = useReportsState();
  const simplifiedDataContext = useSimplifiedDataState();
  const authContext = useAuthState();
  const [activeTab, handleTabChange] = useTabs();

  const {
    loading,
    getReports,
    getMyReports,
    reportsData,
    myReportsData,
    deleteReport,
    addReport,
    setCurrent,
  } = reportsContext;

  // const {
  //   loading: simpleDataLoading,
  //   getPlayers,
  //   playersData,
  // } = simplifiedDataContext;

  const { loading: userLoading, user } = authContext;

  const [filters, setFilters] = useState<OrdersFilterData>({
    player: '',
    status: 'all',
    createdAfter: formatDateObject(today),
    createdBefore: formatDateObject(tomorrow),
  });

  const isAdmin = user?.role === 'admin';

  return (
    <>
      {(loading || userLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="reports">
          <Tab label="Moje raporty" id="reports-0" aria-controls="reports-0" />
          <Tab label="Dodaj/edytuj" id="reports-1" aria-controls="reports-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="reports">
        <ReportsGrid
          reportsData={myReportsData}
          getReports={getMyReports}
          setCurrent={setCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="reports">
        <p>Formularz edycji / dodawania raportu</p>
      </TabPanel>
    </>
  );
};
