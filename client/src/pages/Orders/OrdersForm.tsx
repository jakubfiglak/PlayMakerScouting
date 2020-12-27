import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, FormControl, TextField } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { Loader } from '../../components/Loader';
// Types
import { PlayerData } from '../../types/simplifiedData';
// Hooks
import { useOrdersState } from '../../context/orders/useOrdersState';
// Utils & data
import { ordersFormInitialValues } from '../../components/forms/initialValues';
import { ordersFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  playersData: PlayerData[];
};

export const OrdersForm = ({ playersData }: Props) => {
  const { addOrder, loading } = useOrdersState();

  return (
    <Formik
      initialValues={ordersFormInitialValues}
      validationSchema={ordersFormValidationSchema}
      onSubmit={(data) => addOrder(data)}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          {loading && <Loader />}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <PlayersCombo playersData={playersData} label="Zawodnik" />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Field
                name="notes"
                as={TextField}
                variant="outlined"
                fullWidth
                label="Uwagi"
                error={touched.notes && !!errors.notes}
                helperText={touched.notes && errors.notes}
              />
            </Grid>
            <MainFormActions
              label="zlecenie"
              onCancelClick={handleReset}
              isEditState={false}
            />
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
