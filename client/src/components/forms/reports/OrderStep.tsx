import React from 'react';
// MUI components
import { Typography } from '@material-ui/core';
// Custom components
import { OrdersSelect } from '../selects';
// Types
import { OrderData } from '../../../types/simplifiedData';

type Props = {
  ordersData: OrderData[];
};

export const OrderStep = ({ ordersData }: Props) => {
  if (ordersData.length === 0) {
    return (
      <Typography>
        Nie masz żadnych zleceń w toku. Przyjmij zlecenie do realizacji lub wróć
        do poprzedniego kroku i wybierz opcję <strong>Własny raport</strong>, by
        stworzyć raport dla dowolnie wybranego zawodnika.
      </Typography>
    );
  }
  return <OrdersSelect ordersData={ordersData} name="order" />;
};
