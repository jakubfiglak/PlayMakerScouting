import * as yup from 'yup';
import { PlayersFormData, Position, Foot } from '../../../types/players';

export const validationSchema: yup.ObjectSchema<PlayersFormData> = yup
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
