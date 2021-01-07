import React, { useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import { useReactToPrint } from 'react-to-print';
// MUI components
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
// Custom components
import { ReportsTable } from './ReportsTable';
import { ReportsFilterForm } from './ReportsFilterForm';
import { NewReportForm } from './forms/NewReportForm';
import { EditReportForm } from './forms/EditReportForm';
import { PrinteableReport } from '../Report/PrinteableReport';
import { MainTemplate } from '../../templates/MainTemplate';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
// Types
import { Report, ReportFormData, ReportsFilterData } from '../../types/reports';
// Hooks
import { useAlert, useTabs } from '../../hooks';
import { useTable } from '../../hooks/useTable';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useReportsState } from '../../context/reports/useReportsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useOrdersState } from '../../context/orders/useOrdersState';
// Utils & data
import { reportsFormInitialValues } from '../../components/forms/initialValues';
import { reportsFormValidationSchema } from '../../components/forms/validationSchemas';

export const ReportsPage = () => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);

  const {
    loading,
    getReports,
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
    loading: playersLoading,
    getPlayersList,
    playersList,
    addPlayer,
    message: playersMessage,
    clearMessage: clearPlayersMessage,
    error: playersError,
    clearErrors: clearPlayersErrors,
  } = usePlayersState();

  const {
    loading: ordersLoading,
    getOrdersList,
    ordersList,
  } = useOrdersState();

  const { loading: clubsLoading, getClubsList, clubsList } = useClubsState();

  const user = useAuthenticatedUser();

  const [activeTab, handleTabChange, setActiveTab] = useTabs();

  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();

  const [isAddPlayerModalOpen, setIsAddPlayerModalOpen] = useState(false);

  const [filters, setFilters] = useState<ReportsFilterData>({
    player: '',
  });

  const initialValues: ReportFormData = current
    ? {
        order: current.order,
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

  useEffect(() => {
    getPlayersList();
    getClubsList();
    getOrdersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getReports(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

  useAlert(error, 'error', clearErrors);
  useAlert(playersError, 'error', clearPlayersErrors);
  useAlert(message, 'success', clearMessage);
  useAlert(playersMessage, 'success', clearPlayersMessage);

  const handleSetCurrent = (report: Report) => {
    setCurrent(report);
    setActiveTab(1);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: `PlaymakerReport_${current?._id}`,
    onAfterPrint: () => clearCurrent(),
  }) as () => void;

  const handlePrintClick = (report: Report) => {
    setCurrent(report);
    setTimeout(() => handlePrint(), 10);
  };

  return (
    <MainTemplate>
      {(loading || playersLoading || clubsLoading || ordersLoading) && (
        <Loader />
      )}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="reports">
          <Tab label="Raporty" id="reports-0" aria-controls="reports-0" />
          <Tab label="Dodaj/edytuj" id="reports-1" aria-controls="reports-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="reports">
        <ReportsFilterForm playersData={playersList} setFilters={setFilters} />
        <ReportsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={reportsData.totalDocs}
          reports={reportsData.docs}
          handleEditClick={handleSetCurrent}
          handlePrintClick={handlePrintClick}
        />
        {current && (
          <div className={classes.print}>
            <div ref={ref}>
              <PrinteableReport report={current} />
            </div>
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
            current ? (
              <EditReportForm report={current} />
            ) : (
              <NewReportForm
                isOrderOptionDisabled={user.role === 'scout'}
                playersList={playersList}
                ordersList={ordersList}
                onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
              />
            )
          }
        </Formik>
        <AddPlayerModal
          clubsData={clubsList}
          onClose={() => setIsAddPlayerModalOpen(false)}
          onSubmit={addPlayer}
          open={isAddPlayerModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};

const useStyles = makeStyles(() => ({
  print: {
    overflow: 'hidden',
    height: 0,
  },
}));
