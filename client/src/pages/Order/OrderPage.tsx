import React from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// MUI components
import { Button, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { OrderDetails } from './OrderDetails';
import { Loader } from '../../components/Loader';
import { PageHeading } from '../../components/PageHeading';
import { MainTemplate } from '../../templates/MainTemplate';
// Hooks
import { useAuthenticatedUser } from '../../hooks/useAuthenticatedUser';
import { useOrder, useAcceptOrder, useCloseOrder } from '../../hooks/orders';

type ParamTypes = {
  id: string;
};

export const OrderPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const user = useAuthenticatedUser();

  const { id } = params;

  const { data: order, isLoading: orderLoading } = useOrder(id);
  const {
    mutate: acceptOrder,
    isLoading: acceptOrderLoading,
  } = useAcceptOrder();
  const { mutate: closeOrder, isLoading: closeOrderLoading } = useCloseOrder();

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
        <PageHeading title={`Zlecenie obserwacji nr ${order?.docNumber}`} />
      </div>
      {order && (
        <OrderDetails
          order={order}
          acceptOrder={acceptOrder}
          closeOrder={closeOrder}
          areAdminOptionsEnabled={user.role === 'admin'}
        />
      )}
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
}));
