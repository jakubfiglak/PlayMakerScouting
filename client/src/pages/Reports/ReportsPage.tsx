import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
// MUI components
import { AppBar, Tabs, Tab, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { ReportsTable } from './ReportsTable';
import { ReportsFilterForm } from './ReportsFilterForm';
import { NewReportForm } from './forms/NewReportForm';
import { EditReportForm } from './forms/EditReportForm';
import { PrinteableReport } from '../Report/PrinteableReport';
import { TabPanel } from '../../components/TabPanel';
import { Loader } from '../../components/Loader';
import { AddPlayerModal } from '../../components/modals/AddPlayerModal';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Types
import { Report, ReportFormData, ReportsFilterData } from '../../types/reports';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useReports, useSetReportStatus } from '../../hooks/reports';
import { useClubsList } from '../../hooks/clubs';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useReportsState } from '../../context/reports/useReportsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useOrdersState } from '../../context/orders/useOrdersState';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { useSettingsState } from '../../context/settings/useSettingsState';

type LocationState = { setActiveTab: number };

export const ReportsPage = () => {
  const { defaultReportBackgroundImageUrl } = useSettingsState();
  const classes = useStyles({ background: defaultReportBackgroundImageUrl });
  const ref = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation<LocationState | null>();

  const {
    loading,
    getReports,
    reportsData,
    setCurrent,
    addReport,
    editReport,
    clearCurrent,
    current,
  } = useReportsState();

  const {
    loading: playersLoading,
    getPlayersList,
    playersList,
    addPlayer,
  } = usePlayersState();

  const {
    loading: ordersLoading,
    getOrdersList,
    ordersList,
  } = useOrdersState();

  const { data: clubs, isLoading: clubsLoading } = useClubsList();

  const { setAlert } = useAlertsState();

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

  const { data: reports, isLoading: reportsLoading } = useReports({
    page: page + 1,
    limit: rowsPerPage,
    sort: sortBy,
    order,
    filters,
  });
  const {
    mutate: setReportStatus,
    isLoading: setStatusLoading,
  } = useSetReportStatus();

  useEffect(() => {
    getPlayersList();
    if (user.role !== 'scout') {
      getOrdersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state?.setActiveTab) {
      setActiveTab(state.setActiveTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.setActiveTab]);

  const handleSetCurrent = (report: Report) => {
    setCurrent(report);
    setActiveTab(1);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    documentTitle: 'Playmaker-Report',
    bodyClass: classes.pageBody,
    onAfterPrint: () => clearCurrent(),
  }) as () => void;

  const handlePrintClick = (report: Report) => {
    setCurrent(report);
    setTimeout(() => handlePrint(), 100);
  };

  const onAddReport = (data: ReportFormData) => {
    addReport(data);
    setActiveTab(0);
  };

  const handleEditFormReset = () => {
    setActiveTab(0);
    setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
    clearCurrent();
  };

  return (
    <MainTemplate>
      {(loading ||
        playersLoading ||
        clubsLoading ||
        ordersLoading ||
        reportsLoading ||
        setStatusLoading) && <Loader />}
      <AppBar position="static">
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="reports">
          <Tab label="Raporty" id="reports-0" aria-controls="reports-0" />
          <Tab label="Dodaj/edytuj" id="reports-1" aria-controls="reports-1" />
        </Tabs>
      </AppBar>
      <TabPanel value={activeTab} index={0} title="reports">
        <PageHeading title="Baza raportów" />
        <ReportsFilterForm playersData={playersList} setFilters={setFilters} />
        <ReportsTable
          page={page}
          rowsPerPage={rowsPerPage}
          sortBy={sortBy}
          order={order}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleSort={handleSort}
          total={reports?.totalDocs || 0}
          reports={reports?.docs || []}
          handleEditClick={handleSetCurrent}
          handlePrintClick={handlePrintClick}
          handleSetStatusClick={setReportStatus}
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
        <PageHeading
          title={
            current
              ? `Edycja raportu nr ${current.docNumber}`
              : 'Tworzenie nowego raportu'
          }
        />
        {current ? (
          <EditReportForm
            report={current}
            onReset={handleEditFormReset}
            onSubmit={editReport}
          />
        ) : (
          <NewReportForm
            isOrderOptionDisabled={user.role === 'scout'}
            playersList={playersList}
            ordersList={ordersList}
            onAddPlayerClick={() => setIsAddPlayerModalOpen(true)}
            onSubmit={onAddReport}
          />
        )}
        <AddPlayerModal
          clubsData={clubs || []}
          onClose={() => setIsAddPlayerModalOpen(false)}
          onSubmit={addPlayer}
          open={isAddPlayerModalOpen}
        />
      </TabPanel>
    </MainTemplate>
  );
};

type StyleProps = {
  background: string;
};

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  print: {
    overflow: 'hidden',
    height: 0,
  },
  pageBody: (props) => ({
    backgroundImage: `url(${props.background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
}));
