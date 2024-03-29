import * as yup from 'yup';
import { Position } from '../../../types/players';
import {
  Competition,
  MatchLocation,
  RatingScore,
  ReportDTO,
  Skill,
} from '../../../types/reports';

export const validationSchema: yup.ObjectSchema<ReportDTO> = yup
  .object()
  .shape(
    {
      order: yup.string().when('player', {
        is: (player) => !player || player.length === 0,
        then: yup.string().required('Wybierz zlecenie lub zawodnika'),
      }),
      player: yup.string().when('order', {
        is: (order) => !order || order.length === 0,
        then: yup.string().required('Wybierz zlecenie lub zawodnika'),
      }),
      positionPlayed: yup.mixed<Position>().required('Podaj pozycję zawodnika'),
      shirtNo: yup
        .number()
        .min(1, 'Numer na koszulce musi być większy lub równy 1')
        .max(99, 'Numer na koszulce musi być mniejszy lub równy 99'),
      match: yup
        .object({
          location: yup.mixed<MatchLocation>(),
          against: yup.string(),
          competition: yup.mixed<Competition>(),
          date: yup.string(),
          result: yup.string(),
        })
        .defined(),
      minutesPlayed: yup
        .number()
        .min(0, 'Liczba rozegranych minut musi być wartością pomiędzy 0 a 120')
        .max(120, 'Liczba rozegranych minut musi mieć wartość pomiędzy 0 a 120')
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
      videoURL: yup.string().url('Niepoprawny format url').notRequired(),
      videoDescription: yup.string().notRequired(),
      summary: yup.string().required('Opisz występ'),
      finalRating: yup.mixed<RatingScore>(),
      skills: yup.array<Skill>().defined(),
      maxRatingScore: yup.number().min(2).max(10).required(),
    },
    [['player', 'order']],
  )
  .defined();
