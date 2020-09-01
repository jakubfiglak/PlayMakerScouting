import React from 'react';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { ReportsGrid } from '../reports';
import { ReportsForm, BottomNav } from '../forms';
// Types
import { Report } from '../../types/reports';
// Hooks
import { useReportsState } from '../../context';
import { useTabs } from '../../hooks';

export const ReportsContent = () => {
  const reportsContext = useReportsState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const { loading, getMyReports, myReportsData, setCurrent } = reportsContext;

  const handleSetCurrent = (report: Report) => {
    setCurrent(report);
    setActiveTab(1);
  };

  return (
    <>
      {loading && <Loader />}
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
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="reports">
        <ReportsForm />
        <BottomNav />
      </TabPanel>
    </>
  );
};
