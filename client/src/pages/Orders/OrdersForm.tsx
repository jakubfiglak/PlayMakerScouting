import React from 'react';
import { Formik, Form, Field } from 'formik';
// MUI components
import { Grid, FormControl, TextField } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
// Types
import { PlayerBasicInfo } from '../../types/players';
import { OrderFormData } from '../../types/orders';
// Utils & data
import { ordersFormInitialValues } from '../../components/forms/initialValues';
import { ordersFormValidationSchema } from '../../components/forms/validationSchemas';

type Props = {
  playersData: PlayerBasicInfo[];
  onSubmit: (data: OrderFormData) => void;
  onAddPlayerClick: () => void;
};

export const OrdersForm = ({
  playersData,
  onSubmit,
  onAddPlayerClick,
}: Props) => {
  return (
    <Formik
      initialValues={ordersFormInitialValues}
      validationSchema={ordersFormValidationSchema}
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {({ handleReset, touched, errors }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <PlayersCombo
                  playersData={playersData}
                  label="Zawodnik"
                  addPlayerOption
                  onAddPlayerClick={onAddPlayerClick}
                />
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
