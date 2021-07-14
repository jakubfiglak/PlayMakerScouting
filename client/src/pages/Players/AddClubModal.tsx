import { Formik, Form, Field } from 'formik';
// MUI components
import { TextField, makeStyles, Theme } from '@material-ui/core';
// Custom components
import { FormModal } from '../../components/FormModal';
import { VoivodeshipSelect } from '../../components/selects/VoivodeshipSelect';
import { DivisionSelect } from '../../components/selects/DivisionSelect';
// Types
import { ClubDTO } from '../../types/clubs';
// Utils & data
import { clubsFormInitialValues } from '../../data/forms/initialValues';
import { clubsFormValidationSchema } from '../../data/forms/validationSchemas';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ClubDTO) => void;
};

export const AddClubModal = ({ onClose, onSubmit, open }: Props) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={clubsFormInitialValues}
      validationSchema={clubsFormValidationSchema}
      enableReinitialize
      onSubmit={(data) => {
        onSubmit(data);
        onClose();
      }}
    >
      {({ errors, touched, handleSubmit }) => (
        <FormModal
          title="Dodaj klub"
          onClose={onClose}
          onSubmit={handleSubmit}
          open={open}
        >
          <Form className={classes.container}>
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
          </Form>
        </FormModal>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: `${theme.spacing(2)}px`,
  },
}));
