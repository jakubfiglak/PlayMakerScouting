import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
// Types
import { OrderBasicInfo } from '../../types/orders';

type Props = {
  ordersData: OrderBasicInfo[];
  name: string;
};

export const OrdersSelect = ({ ordersData, name }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="order">Zlecenie</InputLabel>
      <Select
        {...field}
        labelId="order"
        label="Zlecenie"
        error={touched && !!error}
      >
        {ordersData.map((orderData) => {
          const { _id, player } = orderData;

          return (
            <MenuItem key={_id} value={_id}>
              {`Zlecenie nr ${_id} ${player.lastName}, ${player.firstName}`}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
