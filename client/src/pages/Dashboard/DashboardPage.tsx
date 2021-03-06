import { makeStyles, Theme } from '@material-ui/core';
// MUI icons
import {
  DirectionsRun as PlayersIcon,
  Security as ClubsIcon,
  Assignment as OrdersIcon,
  Assessment as ReportsIcon,
} from '@material-ui/icons';
// Custom components
import { CountCard } from './CountCard';
import { ReportCard } from './ReportCard';
import { OrderCard } from './OrderCard';
import { CreateReportCard } from './CreateReportCard';
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useDashboardData } from '../../hooks/dashboard';
// Utils & data
import { MainTemplate } from '../../templates/MainTemplate';
import { Loader } from '../../components/Loader';

export const DashboardPage = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const isPrivilegedUser = user.role !== 'scout';

  const { data, isLoading } = useDashboardData();

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <PageHeading title="Twoja aktywność" />
      <div className={classes.container}>
        <CreateReportCard />
        <CountCard
          title="Zawodników w bazie"
          count={data?.playersCount}
          icon={<PlayersIcon />}
          linkTo="/players"
        />
        <CountCard
          title="Klubów w bazie"
          count={data?.clubsCount}
          icon={<ClubsIcon />}
          linkTo="/clubs"
        />
        {isPrivilegedUser && (
          <>
            <CountCard
              title="Zrealizowane zlecenia"
              count={data?.closedOrdersCount || 0}
              icon={<OrdersIcon />}
              linkTo="/orders"
            />
            <CountCard
              title="Zlecenia w realizacji"
              count={data?.acceptedOrdersCount || 0}
              icon={<OrdersIcon />}
              linkTo="/orders"
            />
          </>
        )}
        <CountCard
          title="Sporządzonych raportów"
          count={data?.reportsCount}
          icon={<ReportsIcon />}
          linkTo="/reports"
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
        {isPrivilegedUser && data?.latestOrder && (
          <OrderCard title="Najnowsze zlecenie" order={data.latestOrder} />
        )}
      </div>
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: `${theme.spacing(2)}px`,
    marginTop: theme.spacing(2),
  },
}));
