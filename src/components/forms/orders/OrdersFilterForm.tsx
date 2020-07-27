import React, { SyntheticEvent, Dispatch, SetStateAction } from 'react';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { PlayersSelect, OrderStatusSelect } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { OrdersFilterData } from '../../../types/orders';
import { PlayerData } from '../../../types/simplifiedData';
// Hooks
import { useForm } from '../../../hooks';
// Utils & data
import { formatDateObject } from '../../../utils';
// Styles
import { useStyles } from '../styles';

type FilterFormProps = {
  playersData: PlayerData[];
  setFilters: Dispatch<SetStateAction<OrdersFilterData>>;
};

const initialState: OrdersFilterData = {
  player: '',
  status: 'all',
  createdAfter: formatDateObject(new Date()),
  createdBefore: formatDateObject(new Date()),
};

export const OrdersFilterForm = ({
  playersData,
  setFilters,
}: FilterFormProps) => {
  const classes = useStyles();
  const [formData, onInputChange, setFormData] = useForm(initialState);

  const { player, status, createdAfter, createdBefore } = formData;

  const handleClearFilter = () => {
    setFormData(initialState);
    setFilters(initialState);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setFilters(formData);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <PlayersSelect
              playersData={playersData}
              onChange={onInputChange}
              value={player}
              id="player"
              label="Zawodnik"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <FormControl variant="outlined" size="small" fullWidth>
            <OrderStatusSelect onChange={onInputChange} value={status} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            label="Utworzone po"
            id="createdAfter"
            name="createdAfter"
            size="small"
            value={createdAfter}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3} className={classes.input}>
          <TextField
            type="date"
            variant="outlined"
            fullWidth
            label="Utworzone przed"
            id="createdBefore"
            name="createdBefore"
            size="small"
            value={createdBefore}
            onChange={onInputChange}
          />
        </Grid>
        <FilterFormActions handleClearFilter={handleClearFilter} />
      </Grid>
    </form>
  );
};
