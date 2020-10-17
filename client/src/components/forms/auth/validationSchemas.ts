import * as yup from 'yup';
import { RegisterFormData } from '../../../types/auth';

export const registerFormValidationSchema: yup.ObjectSchema<RegisterFormData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    email: yup.string().email().required('Podaj adres e-mail'),
    phone: yup.string(),
    address: yup
      .object({
        street: yup.string().required('Podaj ulicę'),
        streetNo: yup.string().required('Podaj numer ulicy'),
        zipCode: yup.string().required('Podaj kod pocztowy'),
        city: yup.string().required('Podaj miasto'),
        voivodeship: yup.string(),
        country: yup.string().required('Podaj kraj'),
      })
      .defined(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 ')
      .required('Podaj promień działania'),
    password: yup
      .string()
      .min(6, 'Hasło musi składać się co najmniej z 6 znaków')
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
        'Hasło musi zawierać co najmniej jedną małą literę, wielką literę oraz cyfrę',
      )
      .required('Podaj hasło'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();
