import React, { useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { PlayerDetails } from './PlayerDetails';
import { ReportsTable } from '../Reports/ReportsTable';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { usePlayersState } from '../../context/players/usePlayersState';
import { usePlayersReports, useSetReportStatus } from '../../hooks/reports';

import { useTable } from '../../hooks/useTable';
// Types
import { Report } from '../../types/reports';

type ParamTypes = {
  id: string;
};

export const PlayerPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const [
    page,
    rowsPerPage,
    sortBy,
    order,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  ] = useTable();
  const { loading, playerData, getPlayer } = usePlayersState();

  const { id } = params;

  const {
    mutate: setReportStatus,
    isLoading: setStatusLoading,
  } = useSetReportStatus();
  const { data: reports, isLoading: reportsLoading } = usePlayersReports({
    playerId: id,
    page: page + 1,
    order,
    limit: rowsPerPage,
    sort: sortBy,
  });

  useEffect(() => {
    getPlayer(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handlePrintClick(report: Report) {
    console.log(report);
  }

  return (
    <MainTemplate>
      {(loading || reportsLoading) && <Loader />}
      <div className={classes.container}>
        <Button
          to="/players"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy zawodników
        </Button>
        <PageHeading title="Profil zawodnika" />
      </div>
      {playerData && <PlayerDetails player={playerData} />}
      <Typography
        variant="h6"
        component="h3"
        align="center"
        className={classes.title}
      >
        Zawodnicy
      </Typography>
      <ReportsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        reports={reports?.docs || []}
        total={reports?.totalDocs || 0}
        onPrintClick={handlePrintClick}
        onSetStatusClick={setReportStatus}
      />
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginBottom: theme.spacing(1),
  },
  title: {
    margin: theme.spacing(2),
  },
}));
