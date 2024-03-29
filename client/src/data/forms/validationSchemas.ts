import * as yup from 'yup';
import { Country, Voivodeship } from '../../types/common';
import { PlayerDTO, Position, Foot } from '../../types/players';
import { ClubDTO, Division, Group } from '../../types/clubs';

export const passwordValidationSchema = yup
  .string()
  .min(6, 'Hasło musi składać się co najmniej z 6 znaków')
  .matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
    'Hasło musi zawierać co najmniej jedną małą literę, wielką literę oraz cyfrę',
  )
  .required('Podaj hasło');

export const playersFormValidationSchema: yup.ObjectSchema<PlayerDTO> = yup
  .object({
    firstName: yup.string().required('Podaj imię zawodnika'),
    lastName: yup.string().required('Podaj nazwisko zawodnika'),
    country: yup.mixed<Country>().required('Wybierz narodowość zawodnika'),
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

export const clubsFormValidationSchema: yup.ObjectSchema<ClubDTO> = yup
  .object({
    name: yup.string().required('Podaj nazwę klubu'),
    country: yup.mixed<Country>().required('Podaj kraj klubu'),
    division: yup.mixed<Division>().required('Podaj poziom rozgrywkowy klubu'),
    group: yup.mixed<Group>().nullable(),
    voivodeship: yup
      .mixed<Voivodeship | 'Zagranica'>()
      .required('Podaj województwo'),
    lnpID: yup.string().notRequired(),
  })
  .defined();
