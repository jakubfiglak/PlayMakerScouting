import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, Grid, makeStyles, Theme } from '@material-ui/core';
// Types
import { ForgotPasswordFormData } from '../../types/auth';

type Props = {
  onSubmit: (data: ForgotPasswordFormData) => void;
};

export const ForgotPasswordForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  const formik = useFormik<ForgotPasswordFormData>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  const { handleSubmit, errors, touched, getFieldProps } = formik;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...getFieldProps('email')}
        error={touched.email && !!errors.email}
        helperText={touched.email && !!errors.email && errors.email}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Wyślij
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/login" className={classes.link}>
            Wróć do strony logowania
          </Link>
        </Grid>
        <Grid item>
          <Link to="/register" className={classes.link}>
            Nie masz konta? Zarejestruj się
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    position: 'relative',
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const validationSchema: yup.ObjectSchema<ForgotPasswordFormData> = yup
  .object({
    email: yup
      .string()
      .email('Niepoprawny adres e-mail')
      .required('Podaj adres e-mail'),
  })
  .defined();
