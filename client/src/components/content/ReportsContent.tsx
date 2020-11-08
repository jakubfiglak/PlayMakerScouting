import React, { useEffect } from 'react';
import { Formik } from 'formik';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { TabPanel, Loader } from '../common';
import { ReportsGrid } from '../reports';
import { EditReportForm, NewReportForm } from '../forms';
// Types
import { Report, ReportFormData } from '../../types/reports';
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
    editReport,
    error,
    message,
    clearErrors,
    clearMessage,
    clearCurrent,
    current,
  } = reportsContext;

  const initialValues: ReportFormData = current
    ? {
        order: current?.order?._id || '',
        player: current.player._id,
        match: current.match._id,
        minutesPlayed: current.minutesPlayed,
        goals: current.goals,
        assists: current.assists,
        yellowCards: current.yellowCards,
        redCards: current.redCards,
        finalRating: current.finalRating,
        summary: current.summary,
        individualSkills: current.individualSkills,
        teamplaySkills: current.teamplaySkills,
        motorSkills: current.motorSkills,
      }
    : reportsFormInitialValues;

  useEffect(() => {
    getMyReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === 0 && current) {
      clearCurrent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, current]);

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
          initialValues={initialValues}
          validationSchema={reportsFormValidationSchema}
          onSubmit={(data, { resetForm }) => {
            if (current) {
              editReport(current._id, data);
            } else {
              addReport(data);
              resetForm();
            }
          }}
        >
          {() =>
            current ? <EditReportForm report={current} /> : <NewReportForm />
          }
        </Formik>
      </TabPanel>
    </>
  );
};
