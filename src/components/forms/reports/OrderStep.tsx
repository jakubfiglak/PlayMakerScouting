import React, { useEffect } from 'react';
// MUI components
import { FormControl, SelectProps } from '@material-ui/core';
// Custom components
import { OrdersSelect } from '../selects';
import { Loader } from '../../common';
// Hooks
import { useOrdersState } from '../../../context';

export const OrderStep = ({ value, onChange }: SelectProps) => {
  const ordersContext = useOrdersState();

  const { loading, getMyOrders, myOrdersData } = ordersContext;

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <FormControl variant="outlined" fullWidth>
        <OrdersSelect
          ordersData={myOrdersData}
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};
