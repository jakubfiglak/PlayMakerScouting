import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
// MUI components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Theme,
  TextField,
  Link,
} from '@material-ui/core';
// MUI icons
import { LocalPhone as PhoneIcon, Mail as MailIcon } from '@material-ui/icons';
// Custom components
import { Loader } from '../../components/Loader';
// Hooks
import { useSendEmail } from '../../hooks/email';
// Utils & data
import { Email } from '../../types/email';
import { MainFormActions } from '../../components/formActions/MainFormActions';
import { useAlertsState } from '../../context/alerts/useAlertsState';
import { FormContainer } from '../../components/FormContainer';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ContactFormModal = ({ onClose, open }: Props) => {
  const classes = useStyles();

  const { mutate: sendEmail, isLoading } = useSendEmail();
  const { setAlert } = useAlertsState();

  return (
    <>
      {isLoading ? <Loader /> : null}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.container }}
      >
        <DialogTitle id="form-dialog-title">Formularz kontaktowy</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              from: '',
              subject: '',
              message: '',
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(data, { resetForm }) => {
              sendEmail(data);
              resetForm();
            }}
          >
            {({ errors, touched, handleReset }) => (
              <Form>
                <FormContainer fullWidth>
                  <Field
                    name="from"
                    as={TextField}
                    type="email"
                    variant="outlined"
                    fullWidth
                    label="Twój adres email"
                    id="from"
                    error={touched.from && !!errors.from}
                    helperText={touched.from && errors.from}
                  />
                  <Field
                    name="subject"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Temat wiadomości"
                    error={touched.subject && !!errors.subject}
                    helperText={touched.subject && errors.subject}
                  />
                  <Field
                    name="message"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    label="Treść wiadomości"
                    error={touched.message && !!errors.message}
                    helperText={touched.message && errors.message}
                    multiline
                  />
                  <MainFormActions
                    altActionLabel="Wyślij"
                    label="wiadomość"
                    isEditState={false}
                    onCancelClick={() => {
                      setAlert({
                        msg: 'Zmiany zostały anulowane',
                        type: 'warning',
                      });
                      handleReset();
                    }}
                  />
                </FormContainer>
              </Form>
            )}
          </Formik>
          <div className={classes.contactContainer}>
            <Link href="tel:+48504271466" className={classes.contact}>
              <PhoneIcon />
              +48 504 271 466
            </Link>
            <Link href="mailto:biuro@playmaker.pro" className={classes.contact}>
              <MailIcon />
              biuro@playmaker.pro
            </Link>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '95%',
  },
  contactContainer: {
    fontSize: 18,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
    color: theme.palette.primary.main,
  },
  contact: {
    textDecoration: 'none',
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'center',
  },
}));

export const validationSchema: yup.ObjectSchema<Email> = yup
  .object({
    from: yup
      .string()
      .required('Proszę podać swój adres email')
      .email('Proszę podać poprawny adres email'),
    subject: yup.string().required('Proszę podać temat wiadomości'),
    message: yup.string().required('Proszę podać treść wiadomości'),
  })
  .defined();
