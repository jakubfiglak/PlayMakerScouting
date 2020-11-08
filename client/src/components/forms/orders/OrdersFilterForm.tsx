import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { OrderStatusSelect, PlayersCombo } from '../selects';
import { FilterFormActions } from '../actions';
// Types
import { OrdersFilterData } from '../../../types/orders';
import { PlayerData } from '../../../types/simplifiedData';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../../utils';
// Styles
import { useStyles } from '../styles';

type FilterFormProps = {
  playersData: PlayerData[];
  setFilters: Dispatch<SetStateAction<OrdersFilterData>>;
};

const initialFilters: OrdersFilterData = {
  player: '',
  status: 'open',
  createdAfter: formatDateObject(yearFromNow),
  createdBefore: formatDateObject(tomorrow),
};

export const OrdersFilterForm = ({
  playersData,
  setFilters,
}: FilterFormProps) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={initialFilters}
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <FormControl variant="outlined" size="small" fullWidth>
                <PlayersCombo
                  playersData={playersData}
                  label="Zawodnik"
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <OrderStatusSelect size="small" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <Field
                name="createdAfter"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Utworzone po"
                id="createdAfter"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3} className={classes.input}>
              <Field
                name="createdBefore"
                as={TextField}
                type="date"
                variant="outlined"
                fullWidth
                label="Utworzone przed"
                id="createdBefore"
                size="small"
              />
            </Grid>
            <FilterFormActions
              handleClearFilter={() => {
                handleReset();
                setFilters(initialValues);
              }}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
