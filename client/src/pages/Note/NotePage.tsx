import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, Typography, makeStyles, Theme } from '@material-ui/core';
// Custom components
// import { PlayerDetails } from './PlayerDetails';
import { ReportsTable } from '../Reports/ReportsTable';
import { ReportsTableRow } from '../Reports/ReportsTableRow';
import { MainTemplate } from '../../templates/MainTemplate';
import { PageHeading } from '../../components/PageHeading';
import { Loader } from '../../components/Loader';
// Hooks
import { useMatch } from '../../hooks/matches';
import { usePlayersReports } from '../../hooks/reports';
import { useTable } from '../../hooks/useTable';

type ParamTypes = {
  id: string;
};

export const NotePage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('playersReportsTable');

  const { id } = params;

  const { data: match, isLoading: matchLoading } = useMatch(id);

  // const { data: reports } = usePlayersReports({
  //   playerId: id,
  //   page: page + 1,
  //   order,
  //   limit: rowsPerPage,
  //   sort: sortBy,
  // });

  const isLoading = matchLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/notes"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy notatek
        </Button>
        <PageHeading title="Szczegóły meczu" />
      </div>
      {/* {match ? <MatchDetails match={match} /> : null} */}
      <Typography
        variant="h6"
        component="h3"
        align="center"
        className={classes.title}
      >
        Notatki
      </Typography>
      {/* <ReportsTable
        page={page}
        rowsPerPage={rowsPerPage}
        sortBy={sortBy}
        order={order}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSort={handleSort}
        total={reports?.totalDocs || 0}
      >
        {reports
          ? reports.docs.map((report) => (
              <ReportsTableRow key={report.id} report={report} />
            ))
          : null}
      </ReportsTable> */}
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
