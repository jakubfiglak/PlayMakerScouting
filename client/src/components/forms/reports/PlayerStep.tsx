import React, { useEffect } from 'react';
// MUI components
import { FormControl, Typography } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
// Hooks
import { useSimplifiedDataState, useOrdersState } from '../../../context';

type Props = {
  order?: string;
  current: Report | null;
};

export const PlayerStep = ({ order, current }: Props) => {
  const ordersContext = useOrdersState();
  const simplifiedDataContext = useSimplifiedDataState();

  const { loading, getOrder, orderData } = ordersContext;
  const {
    loading: simpleDataLoading,
    getPlayers,
    playersData,
  } = simplifiedDataContext;

  useEffect(() => {
    if (!current) {
      if (order) {
        getOrder(order);
      } else {
        getPlayers();
      }
    }
  }, []);

  if (current) {
    const {
      player: { lastName, firstName },
    } = current;

    return (
      <Typography>
        {lastName}, {firstName}
      </Typography>
    );
  }
  return (
    <>
      {(loading || simpleDataLoading) && <Loader />}
      {order && orderData ? (
        <p> {`${orderData.player.lastName}, ${orderData.player.firstName}`}</p>
      ) : (
        <FormControl variant="outlined" fullWidth>
          <PlayersCombo label="Zawodnik" playersData={playersData} />
        </FormControl>
      )}
    </>
  );
};
