import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, Grid, FormControl } from '@material-ui/core';
// Custom components
import { OrderStatusSelect } from '../../components/selects/OrderStatusSelect';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
// Types
import { OrdersFilterData } from '../../types/orders';
import { PlayerBasicInfo } from '../../types/players';
// Utils & data
import { formatDateObject, yearFromNow, tomorrow } from '../../utils/dates';

type FilterFormProps = {
  playersData: PlayerBasicInfo[];
  setFilters: Dispatch<SetStateAction<OrdersFilterData>>;
};

const initialFilters: OrdersFilterData = {
  player: '',
  status: '',
  createdAfter: formatDateObject(yearFromNow),
  createdBefore: formatDateObject(tomorrow),
};

export const OrdersFilterForm = ({
  playersData,
  setFilters,
}: FilterFormProps) => {
  return (
    <Formik
      initialValues={initialFilters}
      enableReinitialize
      onSubmit={(data) => setFilters(data)}
    >
      {({ handleReset, initialValues }) => (
        <Form autoComplete="off">
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} lg={3}>
              <FormControl variant="outlined" size="small" fullWidth>
                <PlayersCombo
                  playersData={playersData}
                  label="Zawodnik"
                  size="small"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <OrderStatusSelect size="small" />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
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
            <Grid item xs={12} sm={6} lg={3}>
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
