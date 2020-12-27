import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
// Custom components
import { ReportsGrid } from './ReportsGrid';
import { ReportsFilterForm } from './ReportsFilterForm';
import { NewReportForm } from './forms/NewReportForm';
import { EditReportForm } from './forms/EditReportForm';
import { MainTemplate } from '../../templates/MainTemplate';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
// Types
import { Report, ReportFormData, ReportsFilterData } from '../../types/reports';
// Hooks
import { useAlert, useTabs } from '../../hooks';
import { useAuthState } from '../../context/auth/useAuthState';
import { useReportsState } from '../../context/reports/useReportsState';
import { useSimplifiedDataState } from '../../context/simplifiedData/useSimplifiedDataState';
// Utils & data
import { reportsFormInitialValues } from '../../components/forms/initialValues';
import { reportsFormValidationSchema } from '../../components/forms/validationSchemas';

export const ReportsPage = () => {
  const {
    loading,
    getMyReports,
    getReports,
    myReportsData,
    reportsData,
    setCurrent,
    addReport,
    editReport,
    error,
    message,
    clearErrors,
    clearMessage,
    clearCurrent,
    current,
  } = useReportsState();

  const {
    loading: simpleDataLoading,
    getPlayers,
    playersData,
  } = useSimplifiedDataState();

  const { loading: userLoading, user } = useAuthState();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const [filters, setFilters] = useState<ReportsFilterData>({
    player: '',
  });

  const initialValues: ReportFormData = current
    ? {
        order: current?.order?._id || '',
        player: current.player._id,
        match: current.match,
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

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    getPlayers();
    if (isAdmin) {
      getReports(filters, 1);
    } else {
      getMyReports(filters, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
    <MainTemplate>
      {(loading || simpleDataLoading || userLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="reports">
          <Tab label="Raporty" id="reports-0" aria-controls="reports-0" />
          <Tab label="Dodaj/edytuj" id="reports-1" aria-controls="reports-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="reports">
        <ReportsFilterForm playersData={playersData} setFilters={setFilters} />
        <ReportsGrid
          reports={isAdmin ? reportsData.docs : myReportsData.docs}
          onEditClick={handleSetCurrent}
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
    </MainTemplate>
  );
};
