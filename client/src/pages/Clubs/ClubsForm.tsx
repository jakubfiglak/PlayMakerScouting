import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
// Custom components
import { DivisionSelect } from '../../components/selects/DivisionSelect';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { FormContainer } from '../../components/FormContainer';
// Hooks
import { useAlertsState } from '../../context/alerts/useAlertsState';
// Types
import { Club, ClubDTO } from '../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../../data/forms/initialValues';
import { clubsFormValidationSchema } from '../../data/forms/validationSchemas';

type Props = {
  current: Club | null;
  onSubmit: (data: ClubDTO) => void;
  onCancelClick?: () => void;
};

export const ClubsForm = ({ current, onSubmit, onCancelClick }: Props) => {
  const { setAlert } = useAlertsState();

  const initialValues: ClubDTO = current
    ? {
        name: current.name,
        voivodeship: current.voivodeship,
        division: current.division,
        lnpID: current.lnpID,
      }
    : clubsFormInitialValues;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={clubsFormValidationSchema}
      enableReinitialize
      onSubmit={(data, { resetForm }) => {
        onSubmit(data);
        resetForm();
      }}
    >
      {({ errors, touched, handleReset }) => (
        <Form>
          <FormContainer>
            <Field
              name="name"
              as={TextField}
              variant="outlined"
              fullWidth
              label="Nazwa"
              autoFocus
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
            <VoivodeshipSelect name="voivodeship" />
            <DivisionSelect />
            <Field
              name="lnpID"
              as={TextField}
              variant="outlined"
              fullWidth
              label="ID Łączy Nas Piłka"
              error={touched.lnpID && !!errors.lnpID}
              helperText={(touched.lnpID && errors.lnpID) || 'Pole opcjonalne'}
            />
            <MainFormActions
              label="klub"
              isEditState={!!current}
              onCancelClick={() => {
                if (onCancelClick) {
                  onCancelClick();
                }
                handleReset();
                setAlert({ msg: 'Zmiany zostały anulowane', type: 'warning' });
              }}
            />
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};
