import * as yup from 'yup';
import { Address, Voivodeship } from '../../types/common';
import {
  RegisterFormData,
  EditAccountData,
  LoginFormData,
  UpdatePasswordData,
} from '../../types/auth';
import {
  PlayersFormData,
  Position,
  Foot,
  GrantAccessFormData,
} from '../../types/players';
import { ClubsFormData, Division } from '../../types/clubs';
import { Competition, MatchesFormData } from '../../types/matches';
import { OrderFormData } from '../../types/orders';
import { ReportFormData, Rating, RatingScore } from '../../types/reports';
import { AssignPlaymakerRoleData } from '../../types/users';

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
    password: passwordValidationSchema,
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'Podane hasła muszą być takie same')
      .required('Potwierdź hasło'),
  })
  .defined();

export const editAccountValidationSchema: yup.ObjectSchema<EditAccountData> = yup
  .object({
    firstName: yup.string().required('Podaj imię'),
    lastName: yup.string().required('Podaj nazwisko'),
    city: yup.string(),
    voivodeship: yup.mixed<Voivodeship | 'Zagranica'>(),
    phone: yup.string(),
    activeRadius: yup
      .number()
      .min(0, 'Promień działania musi być większy lub równy 0 '),
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
    voivodeship: yup
      .mixed<Voivodeship | 'Zagranica'>()
      .required('Podaj województwo'),
  })
  .defined();

export const matchesFormValidationSchema: yup.ObjectSchema<MatchesFormData> = yup
  .object({
    homeTeam: yup.string().required('Wybierz drużynę gospodarzy'),
    awayTeam: yup.string().required('Wybierz drużynę gości'),
    competition: yup.mixed<Competition>().required('Wybierz rodzaj rozgrywek'),
    date: yup.string().required('Podaj datę rozgrywania meczu'),
  })
  .defined();

export const ordersFormValidationSchema: yup.ObjectSchema<OrderFormData> = yup
  .object({
    player: yup.string().required('Wybierz zawodnika'),
    notes: yup.string().notRequired(),
  })
  .defined();

const ratingValidationSchema: yup.ObjectSchema<Rating> = yup
  .object({
    rating: yup.mixed<RatingScore>(),
    note: yup.string(),
  })
  .defined();

export const reportsFormValidationSchema: yup.ObjectSchema<ReportFormData> = yup
  .object({
    order: yup.string(),
    player: yup.string(),
    match: yup.string().required('Wybierz mecz, którego dotyczy raport'),
    minutesPlayed: yup
      .number()
      .min(0, 'Liczba rozegranych minut musi być wartością pomiędzy 0 a 90')
      .max(90, 'Liczba rozegranych minut musi mieć wartość pomiędzy 0 a 90')
      .required(),
    goals: yup
      .number()
      .min(0, 'Liczba goli nie może być mniejsza od 0')
      .required(),
    assists: yup
      .number()
      .min(0, 'Liczba asyst nie może być mniejsza od 0')
      .required(),
    yellowCards: yup
      .number()
      .min(0, 'Liczba żółtych kartek musi mieć wartość 0, 1 lub 2')
      .max(2, 'Liczba żółtych kartek musi mieć wartość 0, 1 lub 2')
      .required(),
    redCards: yup
      .number()
      .min(0, 'Liczba czerwonych kartek musi mieć wartość 0 lub 1')
      .max(1, 'Liczba czerwonych kartek musi mieć wartość 0 lub 1')
      .required(),
    individualSkills: yup
      .object({
        ballReception: ratingValidationSchema,
        holdPass: ratingValidationSchema,
        gainPass: ratingValidationSchema,
        keyPass: ratingValidationSchema,
        defOneOnOne: ratingValidationSchema,
        airPlay: ratingValidationSchema,
        positioning: ratingValidationSchema,
        attOneOnOne: ratingValidationSchema,
        finishing: ratingValidationSchema,
      })
      .defined(),
    teamplaySkills: yup
      .object({
        attack: ratingValidationSchema,
        defense: ratingValidationSchema,
        transition: ratingValidationSchema,
      })
      .defined(),
    motorSkills: yup
      .object({
        leading: yup.string(),
        neglected: yup.string(),
      })
      .defined(),
    summary: yup.string(),
    finalRating: yup.mixed<RatingScore>(),
  })
  .defined();

export const grantAccessFormValidationSchema: yup.ObjectSchema<GrantAccessFormData> = yup
  .object({
    user: yup.string().required('Wybierz użytkownika'),
    player: yup.string().required('Wybierz zawodnika'),
  })
  .defined();

export const assignPlaymakerRoleFormValidationSchema: yup.ObjectSchema<AssignPlaymakerRoleData> = yup
  .object({
    user: yup.string().required('Wybierz użytkownika'),
  })
  .defined();
