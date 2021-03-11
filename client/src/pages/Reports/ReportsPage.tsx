import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import { useReactToPrint } from 'react-to-print';
import * as yup from 'yup';
// MUI components
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
// Assets
import background from '../../assets/report_background.png';
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
import {
  Competition,
  MatchLocation,
  Rating,
  RatingScore,
  Report,
  ReportFormData,
  ReportsFilterData,
} from '../../types/reports';
// Hooks
import { useTabs } from '../../hooks/useTabs';
import { useTable } from '../../hooks/useTable';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useReportsState } from '../../context/reports/useReportsState';
import { usePlayersState } from '../../context/players/usePlayersState';
import { useClubsState } from '../../context/clubs/useClubsState';
import { useOrdersState } from '../../context/orders/useOrdersState';
import { useAlertsState } from '../../context/alerts/useAlertsState';

type LocationState = { setActiveTab: number };

export const ReportsPage = () => {
  const classes = useStyles();
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

  const { loading: clubsLoading, getClubsList, clubsList } = useClubsState();

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

  const initialValues: ReportFormData = current
    ? {
        order: current.order?._id,
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
    if (user.role !== 'scout') {
      getOrdersList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getReports(page + 1, rowsPerPage, sortBy, order, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, sortBy, order, filters]);

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
    documentTitle: `PlaymakerReport_${current?._id}`,
    bodyClass: classes.pageBody,
    onAfterPrint: () => clearCurrent(),
  }) as () => void;

  const handlePrintClick = (report: Report) => {
    setCurrent(report);
    setTimeout(() => handlePrint(), 10);
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

  const handleEditCancelClick = () => {
    clearCurrent();
    setAlert({ msg: 'Anulowano edycję', type: 'warning' });
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
        <PageHeading
          title={
            current
              ? `Edycja raportu nr ${current._id}`
              : 'Tworzenie nowego raportu'
          }
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(data, { resetForm }) => {
            if (current) {
              editReport(current._id, data);
            } else {
              onAddReport(data);
              resetForm();
            }
          }}
        >
          {() =>
            current ? (
              <EditReportForm
                report={current}
                onReset={handleEditFormReset}
                onEditCancelClick={handleEditCancelClick}
              />
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
  pageBody: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}));

const date = new Date(Date.now());
const dateString = date.toISOString().slice(0, 16);

const reportsFormInitialValues: ReportFormData = {
  order: '',
  player: '',
  match: {
    location: 'home',
    against: '',
    competition: 'league',
    date: dateString,
  },
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  individualSkills: {
    ballReception: {
      rating: 1,
      note: '',
    },
    passing: {
      rating: 1,
      note: '',
    },
    defOneOnOne: {
      rating: 1,
      note: '',
    },
    airPlay: {
      rating: 1,
      note: '',
    },
    positioning: {
      rating: 1,
      note: '',
    },
    attOneOnOne: {
      rating: 1,
      note: '',
    },
    finishing: {
      rating: 1,
      note: '',
    },
  },
  teamplaySkills: {
    attack: {
      rating: 1,
      note: '',
    },
    defense: {
      rating: 1,
      note: '',
    },
    transition: {
      rating: 1,
      note: '',
    },
  },
  motorSkills: {
    leading: '',
    neglected: '',
  },
  summary: '',
  finalRating: 1,
};

const ratingValidationSchema: yup.ObjectSchema<Rating> = yup
  .object({
    rating: yup.mixed<RatingScore>(),
    note: yup.string(),
  })
  .defined();

export const validationSchema: yup.ObjectSchema<ReportFormData> = yup
  .object({
    order: yup.string(),
    player: yup.string(),
    match: yup
      .object({
        location: yup.mixed<MatchLocation>(),
        against: yup.string(),
        competition: yup.mixed<Competition>(),
        date: yup.string(),
      })
      .defined(),
    minutesPlayed: yup
      .number()
      .min(0, 'Liczba rozegranych minut musi być wartością pomiędzy 0 a 90')
      .max(90, 'Liczba rozegranych minut musi mieć wartość pomiędzy 0 a 90')
      .required(),
    goals: yup
      .number()
      .min(0, 'Liczba goli nie może być mniejsza od 0')
      .required(),
    assists: yup
      .number()
      .min(0, 'Liczba asyst nie może być mniejsza od 0')
      .required(),
    yellowCards: yup
      .number()
      .min(0, 'Liczba żółtych kartek musi mieć wartość 0, 1 lub 2')
      .max(2, 'Liczba żółtych kartek musi mieć wartość 0, 1 lub 2')
      .required(),
    redCards: yup
      .number()
      .min(0, 'Liczba czerwonych kartek musi mieć wartość 0 lub 1')
      .max(1, 'Liczba czerwonych kartek musi mieć wartość 0 lub 1')
      .required(),
    individualSkills: yup
      .object({
        ballReception: ratingValidationSchema,
        passing: ratingValidationSchema,
        defOneOnOne: ratingValidationSchema,
        airPlay: ratingValidationSchema,
        positioning: ratingValidationSchema,
        attOneOnOne: ratingValidationSchema,
        finishing: ratingValidationSchema,
      })
      .defined(),
    teamplaySkills: yup
      .object({
        attack: ratingValidationSchema,
        defense: ratingValidationSchema,
        transition: ratingValidationSchema,
      })
      .defined(),
    motorSkills: yup
      .object({
        leading: yup.string(),
        neglected: yup.string(),
      })
      .defined(),
    summary: yup.string(),
    finalRating: yup.mixed<RatingScore>(),
  })
  .defined();
