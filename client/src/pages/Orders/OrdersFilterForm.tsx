import React, { Dispatch, SetStateAction } from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, FormControl } from '@material-ui/core';
// Custom components
import { OrderStatusSelect } from '../../components/selects/OrderStatusSelect';
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { FilterFormActions } from '../../components/formActions/FilterFormActions';
import { FormContainer } from '../../components/FormContainer';
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
          <FormContainer>
            <FormControl variant="outlined" size="small" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                size="small"
              />
            </FormControl>
            <OrderStatusSelect size="small" />
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
            <FilterFormActions
              handleClearFilter={() => {
                handleReset();
                setFilters(initialValues);
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
