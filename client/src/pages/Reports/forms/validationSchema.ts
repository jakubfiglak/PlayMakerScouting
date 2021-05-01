import * as yup from 'yup';
import { Position } from '../../../types/players';
import {
  Competition,
  MatchLocation,
  RatingScore,
  ReportFormData,
  Skill,
} from '../../../types/reports';

export const validationSchema: yup.ObjectSchema<ReportFormData> = yup
  .object({
    order: yup.string(),
    player: yup.string(),
    positionPlayed: yup.mixed<Position>().required('Podaj pozycję zawodnika'),
    match: yup
      .object({
        location: yup.mixed<MatchLocation>(),
        against: yup.string(),
        competition: yup.mixed<Competition>(),
        date: yup.string(),
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
    summary: yup.string().required('Opisz występ'),
    finalRating: yup.mixed<RatingScore>(),
    skills: yup.array<Skill>().defined(),
  })
  .defined();
