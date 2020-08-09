import React from 'react';
// MUI components
import { Select, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
// Types
import { Order } from '../../../types/orders';

type OrdersSelectProps = {
  ordersData: Order[];
} & SelectProps;

export const OrdersSelect = ({
  ordersData,
  onChange,
  value,
  required,
  id,
  label,
}: OrdersSelectProps) => {
  return (
    <>
      <InputLabel id={id || 'order'}>{label || 'Zlecenie'}</InputLabel>
      <Select
        labelId={id || 'order'}
        id={id || 'order'}
        label={label || 'Zlecenie'}
        name={id || 'order'}
        onChange={onChange}
        value={value}
        required={required}
      >
        <MenuItem value={undefined}>
          <em>Brak</em>
        </MenuItem>
        {ordersData.map((orderData) => {
          const { _id, player } = orderData;

          return (
            <MenuItem key={_id} value={_id}>
              {`${_id} (${player.lastName}, ${player.firstName})`}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
