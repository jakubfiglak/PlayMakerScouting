import React, { useEffect } from 'react';
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
import { useOrdersState } from '../../context/orders/useOrdersState';

type ParamTypes = {
  id: string;
};

export const OrderPage = () => {
  const classes = useStyles();
  const params = useParams<ParamTypes>();
  const user = useAuthenticatedUser();
  const {
    loading,
    orderData,
    getOrder,
    acceptOrder,
    closeOrder,
  } = useOrdersState();

  const { id } = params;

  useEffect(() => {
    getOrder(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MainTemplate>
      {loading && <Loader />}
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
        <PageHeading title={`Zlecenie obserwacji nr ${orderData?._id}`} />
      </div>
      {orderData && (
        <OrderDetails
          order={orderData}
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
