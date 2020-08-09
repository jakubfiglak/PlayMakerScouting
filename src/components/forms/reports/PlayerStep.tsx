import React, { useEffect } from 'react';
// MUI components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  Typography,
} from '@material-ui/core';
// Custom components
import { PlayersSelect } from '../selects';
import { Loader } from '../../common';
// Types
import { Report } from '../../../types/reports';
// Hooks
import { useSimplifiedDataState, useOrdersState } from '../../../context';

type PlayerStepProps = {
  order?: string;
  current: Report | null;
} & SelectProps;

export const PlayerStep = ({
  order,
  value,
  onChange,
  current,
}: PlayerStepProps) => {
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
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="player">Zawodnik</InputLabel>
          <Select
            labelId="player"
            id="player"
            label="Zawodnik"
            name="player"
            onChange={onChange}
            value={value}
          >
            <MenuItem key={orderData.player._id} value={orderData.player._id}>
              {`${orderData.player.lastName}, ${orderData.player.firstName}`}
            </MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl variant="outlined" fullWidth>
          <PlayersSelect
            playersData={playersData}
            value={value}
            onChange={onChange}
          />
        </FormControl>
      )}
    </>
  );
};
