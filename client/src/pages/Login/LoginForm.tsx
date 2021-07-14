import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, Grid, makeStyles, Theme } from '@material-ui/core';
// Types
import { LoginFormData } from '../../types/auth';

type Props = {
  onSubmit: (data: LoginFormData) => void;
};

export const LoginForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  const formik = useFormik<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
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
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        {...getFieldProps('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && !!errors.password && errors.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Zaloguj się
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/forgotpassword" className={classes.link}>
            Zapomniałeś hasła?
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

const validationSchema: yup.ObjectSchema<LoginFormData> = yup
  .object({
    email: yup
      .string()
      .email('Niepoprawny adres e-mail')
      .required('Podaj adres e-mail'),
    password: yup.string().required('Podaj hasło'),
  })
  .defined();
