import React, { useEffect, useState, ChangeEvent } from 'react';
import { Formik } from 'formik';
// MUI components
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
// Custom components
import { TabPanel, Loader } from '../common';
import { ReportsGrid } from '../reports';
import { EditReportForm, NewReportForm, ReportsFilterForm } from '../forms';
// Types
import { Report, ReportFormData, ReportsFilterData } from '../../types/reports';
// Hooks
import {
  useReportsState,
  useSimplifiedDataState,
  useAuthState,
} from '../../context';
import { useAlert, useTabs } from '../../hooks';
// Styles
import { useStyles } from './styles';
// Utils & data
import { reportsFormInitialValues } from '../forms/initialValues';
import { reportsFormValidationSchema } from '../forms/validationSchemas';

export const ReportsContent = () => {
  const classes = useStyles();
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

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<ReportsFilterData>({
    player: '',
  });

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

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    getPlayers();
    if (isAdmin) {
      getReports(filters, page);
    } else {
      getMyReports(filters, page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page]);

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

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
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
        {(reportsData.docs.length || myReportsData.docs.length) && (
          <div className={classes.paginationContainer}>
            <Pagination
              count={
                isAdmin ? reportsData.totalPages : myReportsData.totalPages
              }
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </div>
        )}
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
