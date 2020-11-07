import React, { useEffect } from 'react';
import { Formik } from 'formik';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { ReportsGrid } from '../reports';
import { ReportsForm } from '../forms';
// Types
import { Report } from '../../types/reports';
// Hooks
import { useReportsState } from '../../context';
import { useAlert, useTabs } from '../../hooks';
// Utils & data
import { reportsFormInitialValues } from '../forms/initialValues';
import { reportsFormValidationSchema } from '../forms/validationSchemas';

export const ReportsContent = () => {
  const reportsContext = useReportsState();
  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const {
    loading,
    getMyReports,
    myReportsData,
    setCurrent,
    addReport,
    error,
    message,
    clearErrors,
    clearMessage,
  } = reportsContext;

  useEffect(() => {
    getMyReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useAlert(error, 'error', clearErrors);
  useAlert(message, 'success', clearMessage);

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
          handleSetCurrent={handleSetCurrent}
        />
      </TabPanel>
      <TabPanel value={activeTab} index={1} title="reports">
        <Formik
          initialValues={reportsFormInitialValues}
          validationSchema={reportsFormValidationSchema}
          onSubmit={(data) => {
            addReport(data);
          }}
        >
          {() => <ReportsForm />}
        </Formik>
      </TabPanel>
    </>
  );
};
