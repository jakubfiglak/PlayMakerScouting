import { makeStyles, Theme } from '@material-ui/core';
// MUI icons
import {
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assessment as ReportsIcon,
  Note as NotesIcon,
} from '@material-ui/icons';
// Custom components
import { CountCard } from './CountCard';
import { ReportCard } from './ReportCard';
import { NoteCard } from './NoteCard';
import { CreateCard } from './CreateCard';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { useDashboardData } from '../../hooks/dashboard';

export const DashboardPage = () => {
  const classes = useStyles();

  const { data, isLoading } = useDashboardData();

  return (
    <>
      {isLoading && <Loader />}
      <PageHeading title="Twoja aktywność" />
      <div className={classes.container}>
        <CreateCard title="stwórz raport" linkTo="/reports" />
        <CreateCard title="stwórz notatkę" linkTo="/notes" />
        <CountCard
          title="Zawodników w bazie"
          count={data?.playersCount || 0}
          icon={<PlayersIcon />}
          linkTo="/players"
        />
        <CountCard
          title="Klubów w bazie"
          count={data?.clubsCount || 0}
          icon={<ClubsIcon />}
          linkTo="/clubs"
        />
        <CountCard
          title="Raportów w bazie"
          count={data?.totalReportsCount || 0}
          icon={<ReportsIcon />}
          linkTo="/reports"
        />
        <CountCard
          title="Sporządzonych raportów"
          count={data?.userReportsCount || 0}
          icon={<ReportsIcon />}
          linkTo="/reports"
        />
        <CountCard
          title="Notatek w bazie"
          count={data?.totalNotesCount || 0}
          icon={<NotesIcon />}
          linkTo="/notes"
        />
        <CountCard
          title="Sporządzonych notatek"
          count={data?.userNotesCount || 0}
          icon={<NotesIcon />}
          linkTo="/notes"
        />
      </div>
      <div className={classes.container}>
        {data?.latestReport && (
          <ReportCard title="Najnowszy raport" report={data.latestReport} />
        )}
        {data?.highestRatedReport && (
          <ReportCard
            title="Najwyżej oceniony raport"
            report={data.highestRatedReport}
          />
        )}
        {data?.latestNote && (
          <NoteCard title="Najnowsza notatka" note={data.latestNote} />
        )}
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: `${theme.spacing(2)}px`,
    marginTop: theme.spacing(2),
  },
}));
