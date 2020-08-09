import React, { useEffect } from 'react';
// MUI components
import { FormControl, SelectProps, Typography } from '@material-ui/core';
// Custom components
import { OrdersSelect } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
// Hooks
import { useOrdersState } from '../../../context';

type OrderStepProps = {
  current: Report | null;
} & SelectProps;

export const OrderStep = ({ value, onChange, current }: OrderStepProps) => {
  const ordersContext = useOrdersState();

  const { loading, getMyOrders, myOrdersData } = ordersContext;

  useEffect(() => {
    if (!current) {
      getMyOrders();
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {current ? (
        <Typography>
          {current.order
            ? `Zlecenie obserwacji nr ${current.order}`
            : 'Raport bez przypisanego zlecenia obserwacji'}
        </Typography>
      ) : (
        <FormControl variant="outlined" fullWidth>
          <OrdersSelect
            ordersData={myOrdersData}
            value={value}
            onChange={onChange}
          />
        </FormControl>
      )}
    </>
  );
};
