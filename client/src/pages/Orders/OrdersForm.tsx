import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { Grid, FormControl, TextField } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
// Types
import { PlayerBasicInfo } from '../../types/players';
import { OrderFormData } from '../../types/orders';

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
      initialValues={{
        player: '',
        notes: '',
      }}
      validationSchema={validationSchema}
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

const validationSchema: yup.ObjectSchema<OrderFormData> = yup
  .object({
    player: yup.string().required('Wybierz zawodnika'),
    notes: yup.string().notRequired(),
  })
  .defined();
