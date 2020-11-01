import * as yup from 'yup';
import { Address } from '../../types/common';
import {
  RegisterFormData,
  EditAccountData,
  LoginFormData,
  UpdatePasswordData,
} from '../../types/auth';
import { PlayersFormData, Position, Foot } from '../../types/players';
import { ClubsFormData, Division } from '../../types/clubs';
import { Competition, MatchesFormData } from '../../types/matches';

const addressValidationSchema: yup.ObjectSchema<Address> = yup
  .object({
    street: yup.string().required('Podaj ulicę'),
    streetNo: yup.string().required('Podaj numer ulicy'),
    zipCode: yup.string().required('Podaj kod pocztowy'),
    city: yup.string().required('Podaj miasto'),
    voivodeship: yup.string(),
    country: yup.string().required('Podaj kraj'),
  })
  .defined();

const passwordValidationSchema = yup
  .string()
  .min(6, 'Hasło musi składać się co najmniej z 6 znaków')
  .matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    'Hasło musi zawierać co najmniej jedną małą literę, wielką literę oraz cyfrę',
  )
  .required('Podaj hasło');

export const loginFormValidationSchema: yup.ObjectSchema<LoginFormData> = yup
  .object({
    email: yup
      .string()
      .email('Niepoprawny adres e-mail')
      .required('Podaj adres e-mail'),
    password: yup.string().required('Podaj hasło'),
  })
  .defined();

export const registerFormValidationSchema: yup.ObjectSchema<RegisterFormData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    email: yup.string().email().required('Podaj adres e-mail'),
    phone: yup.string(),
    address: addressValidationSchema,
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 ')
      .required('Podaj promień działania'),
    password: passwordValidationSchema,
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();

export const editAccountValidationSchema: yup.ObjectSchema<EditAccountData> = yup
  .object({
    phone: yup.string(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 ')
      .required('Podaj promień działania'),
    address: addressValidationSchema,
  })
  .defined();

export const updatePasswordValidationSchema: yup.ObjectSchema<UpdatePasswordData> = yup
  .object({
    oldPassword: yup.string().required('Podaj aktualne hasło'),
    newPassword: passwordValidationSchema,
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref('newPassword')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();

export const playersFormValidationSchema: yup.ObjectSchema<PlayersFormData> = yup
  .object({
    firstName: yup.string().required('Podaj imię zawodnika'),
    lastName: yup.string().required('Podaj nazwisko zawodnika'),
    club: yup.string().required('Wybierz klub zawodnika'),
    position: yup.mixed<Position>().required('Podaj pozycję zawodnika'),
    dateOfBirth: yup.string().required('Podaj datę urodzenia zawodnika'),
    height: yup
      .number()
      .min(0, 'Wzrost zawodnika musi być większy niż 0 cm')
      .required('Podaj wzrost zawodnika'),
    weight: yup
      .number()
      .min(0, 'Waga zawodnika musi być większa niż 0 kg')
      .required('Podaj wzrost zawodnika'),
    footed: yup.mixed<Foot>().required('Podaj preferowaną nogę zawodnika'),
    lnpID: yup.string().notRequired(),
    lnpProfileURL: yup.string().url('Niepoprawny format url').notRequired(),
  })
  .defined();

export const clubsFormValidationSchema: yup.ObjectSchema<ClubsFormData> = yup
  .object({
    name: yup.string().required('Podaj nazwę klubu'),
    division: yup.mixed<Division>().required('Podaj poziom rozgrywkowy klubu'),
    address: addressValidationSchema,
  })
  .defined();

export const matchesFormValidationSchema: yup.ObjectSchema<MatchesFormData> = yup
  .object({
    homeTeam: yup.string().required('Podaj drużynę gospodarzy'),
    awayTeam: yup.string().required('Podaj drużynę gości'),
    competition: yup.mixed<Competition>().required('Podaj rodzaj rozgrywek'),
    date: yup.string().required('Podaj datę rozgrywania meczu'),
  })
  .defined();
