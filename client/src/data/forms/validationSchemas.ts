import * as yup from 'yup';
import { Voivodeship } from '../../types/common';
import { PlayersFormData, Position, Foot } from '../../types/players';
import { ClubsFormData, Division } from '../../types/clubs';

export const passwordValidationSchema = yup
  .string()
  .min(6, 'Hasło musi składać się co najmniej z 6 znaków')
  .matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    'Hasło musi zawierać co najmniej jedną małą literę, wielką literę oraz cyfrę',
  )
  .required('Podaj hasło');

export const playersFormValidationSchema: yup.ObjectSchema<PlayersFormData> = yup
  .object({
    firstName: yup.string().required('Podaj imię zawodnika'),
    lastName: yup.string().required('Podaj nazwisko zawodnika'),
    club: yup.string().required('Wybierz klub zawodnika'),
    position: yup.mixed<Position>().required('Podaj pozycję zawodnika'),
    yearOfBirth: yup.number().required('Podaj rok urodzenia zawodnika'),
    height: yup.number().min(0, 'Wzrost zawodnika musi być większy niż 0 cm'),
    weight: yup.number().min(0, 'Waga zawodnika musi być większa niż 0 kg'),
    footed: yup.mixed<Foot>().required('Podaj preferowaną nogę zawodnika'),
    lnpID: yup.string().notRequired(),
    lnpProfileURL: yup.string().url('Niepoprawny format url').notRequired(),
    minut90ProfileURL: yup.string().url('Niepoprawny format url').notRequired(),
    transfermarktProfileURL: yup
      .string()
      .url('Niepoprawny format url')
      .notRequired(),
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
