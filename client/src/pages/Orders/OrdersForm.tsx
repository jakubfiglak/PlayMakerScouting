import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import { FormControl, TextField } from '@material-ui/core';
// Custom components
import { PlayersCombo } from '../../components/selects/PlayersCombo';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Types
import { PlayerBasicInfo } from '../../types/players';
import { OrderDTO } from '../../types/orders';

type Props = {
  playersData: PlayerBasicInfo[];
  onSubmit: (data: OrderDTO) => void;
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
          <FormContainer>
            <FormControl variant="outlined" fullWidth>
              <PlayersCombo
                playersData={playersData}
                label="Zawodnik"
                addPlayerOption
                onAddPlayerClick={onAddPlayerClick}
              />
            </FormControl>
            <Field
              name="notes"
              as={TextField}
              multiline
              variant="outlined"
              fullWidth
              label="Uwagi"
              error={touched.notes && !!errors.notes}
              helperText={touched.notes && errors.notes}
            />
            <MainFormActions
              label="zlecenie"
              onCancelClick={handleReset}
              isEditState={false}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

const validationSchema: yup.ObjectSchema<OrderDTO> = yup
  .object({
    player: yup.string().required('Wybierz zawodnika'),
    notes: yup.string().notRequired(),
  })
  .defined();
