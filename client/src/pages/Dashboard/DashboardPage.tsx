import React, { useEffect } from 'react';
// MUI components
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
import { PageHeading } from '../../components/PageHeading';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useDashboardData } from '../../operations/queries/useDashboardData';
// Utils & data
import { MainTemplate } from '../../templates/MainTemplate';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { Loader } from '../../components/Loader';

export const DashboardPage = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();
  const { setAlert } = useAlertsState();

  const isPrivilegedUser = user.role !== 'scout';

  const { data, error, isLoading } = useDashboardData();

  useEffect(() => {
    if (error) {
      setAlert({ msg: error.response.data.error, type: 'error' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <PageHeading title="Twoje statystyki" />
      <div className={classes.countCardContainer}>
        <CountCard
          title="Zawodników w bazie"
          count={data?.playersCount}
          icon={<PlayersIcon />}
        />
        <CountCard
          title="Klubów w bazie"
          count={data?.clubsCount}
          icon={<ClubsIcon />}
        />
        {isPrivilegedUser && (
          <>
            <CountCard
              title="Zrealizowane zlecenia"
              count={data?.closedOrdersCount || 0}
              icon={<OrdersIcon />}
            />
            <CountCard
              title="Zlecenia w realizacji"
              count={data?.acceptedOrdersCount || 0}
              icon={<OrdersIcon />}
            />
          </>
        )}
        <CountCard
          title="Sporządzonych raportów"
          count={data?.reportsCount}
          icon={<ReportsIcon />}
        />
      </div>
    </MainTemplate>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  countCardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    justifyContent: 'center',
    gap: `${theme.spacing(2)}px`,
  },
}));
