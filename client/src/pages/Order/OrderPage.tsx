import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
// Custom components
import { OrderDetails } from './OrderDetails';
import { ReportsTable } from '../Reports/ReportsTable';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useTable } from '../../hooks/useTable';
import { useOrder, useAcceptOrder, useCloseOrder } from '../../hooks/orders';
import { useOrdersReports } from '../../hooks/reports';
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';

type ParamTypes = {
  id: string;
};

export const OrderPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const user = useAuthenticatedUser();

  const {
    tableSettings: { page, rowsPerPage, sortBy, order },
    handleChangePage,
    handleChangeRowsPerPage,
    handleSort,
  } = useTable('ordersReportsTable');

  const { id } = params;

  const { data: orderData, isLoading: orderLoading } = useOrder(id);
  const {
    mutate: acceptOrder,
    isLoading: acceptOrderLoading,
  } = useAcceptOrder();
  const { mutate: closeOrder, isLoading: closeOrderLoading } = useCloseOrder();

  const { data: reports } = useOrdersReports({
    orderId: id,
    page: page + 1,
    order,
    limit: rowsPerPage,
    sort: sortBy,
  });

  const isLoading = orderLoading || acceptOrderLoading || closeOrderLoading;

  return (
    <MainTemplate>
      {isLoading && <Loader />}
      <div className={classes.container}>
        <Button
          to="/orders"
          component={RouterLink}
          variant="contained"
          color="primary"
          className={classes.link}
        >
          Wróć do listy zleceń
        </Button>
        <PageHeading title={`Zlecenie obserwacji nr ${orderData?.docNumber}`} />
      </div>
      {orderData && (
        <OrderDetails
          order={orderData}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
          areAdminOptionsEnabled={user.role === 'admin'}
        />
      )}
      <Typography
        variant="h6"
        component="h3"
        align="center"
        className={classes.title}
      >
        Raporty
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
