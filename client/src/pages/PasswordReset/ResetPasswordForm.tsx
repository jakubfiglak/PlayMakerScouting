import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// MUI components
import { TextField, Button, Grid, makeStyles, Theme } from '@material-ui/core';
// Types
import { ResetPasswordFormData } from '../../types/auth';
import { passwordValidationSchema } from '../../data/forms/validationSchemas';

type Props = {
  onSubmit: (data: ResetPasswordFormData) => void;
};

export const ResetPasswordForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  const formik = useFormik<ResetPasswordFormData>({
    initialValues: {
      password: '',
      passwordConfirm: '',
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
        label="Hasło"
        type="password"
        id="password"
        autoComplete="current-password"
        {...getFieldProps('password')}
        error={touched.password && !!errors.password}
        helperText={touched.password && !!errors.password && errors.password}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Potwierdź hasło"
        type="password"
        id="passwordConfirm"
        autoComplete="current-password"
        {...getFieldProps('passwordConfirm')}
        error={touched.passwordConfirm && !!errors.passwordConfirm}
        helperText={
          touched.passwordConfirm &&
          !!errors.passwordConfirm &&
          errors.passwordConfirm
        }
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

const validationSchema: yup.ObjectSchema<ResetPasswordFormData> = yup
  .object({
    password: passwordValidationSchema,
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();
