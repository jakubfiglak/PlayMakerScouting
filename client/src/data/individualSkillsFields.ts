import { IndSkillsField } from '../types/reports';

export const commonIndSkillsFields: IndSkillsField[] = [
  {
    title: 'Podania utrzymujące',
    radioName: 'holdPassRating',
    textFieldName: 'holdPassNote',
  },
  {
    title: 'Podania zdobywające',
    radioName: 'gainPassRating',
    textFieldName: 'gainPassNote',
  },
  {
    title: 'Podania kluczowe',
    radioName: 'keyPassRating',
    textFieldName: 'keyPassNote',
  },
  {
    title: 'Przyjęcie piłki',
    radioName: 'ballReceptionRating',
    textFieldName: 'ballReceptionNote',
  },
];

export const cbIndSkillsFields: IndSkillsField[] = [
  {
    title: 'Gra 1v1 w obronie',
    radioName: 'defOneOnOneRating',
    textFieldName: 'defOneOnOneNote',
  },
  {
    title: 'Gra w powietrzu',
    radioName: 'airPlayRating',
    textFieldName: 'airPlayNote',
  },
  {
    title: 'Ustawianie się',
    radioName: 'positioningRating',
    textFieldName: 'positioningNote',
  },
];

export const fbIndSkillsFields: IndSkillsField[] = [
  {
    title: 'Gra 1v1 w obronie',
    radioName: 'defOneOnOneRating',
    textFieldName: 'defOneOnOneNote',
  },
  {
    title: 'Gra 1v1 w ataku',
    radioName: 'attOneOnOneRating',
    textFieldName: 'attOneOnOneNote',
  },
  {
    title: 'Gra w powietrzu',
    radioName: 'airPlayRating',
    textFieldName: 'airPlayNote',
  },
];

export const mIndSkillsFields: IndSkillsField[] = [
  {
    title: 'Finalizacja akcji',
    radioName: 'finishingRating',
    textFieldName: 'finishingNote',
  },
  {
    title: 'Gra 1v1 w ataku',
    radioName: 'attOneOnOneRating',
    textFieldName: 'attOneOnOneNote',
  },
  {
    title: 'Gra 1v1 w obronie',
    radioName: 'defOneOnOneRating',
    textFieldName: 'defOneOnOneNote',
  },
];

export const fIndSkillsFields: IndSkillsField[] = [
  {
    title: 'Finalizacja akcji',
    radioName: 'finishingRating',
    textFieldName: 'finishingNote',
  },
  {
    title: 'Gra w powietrzu',
    radioName: 'airPlayRating',
    textFieldName: 'airPlayNote',
  },
  {
    title: 'Gra 1v1 w ataku',
    radioName: 'attOneOnOneRating',
    textFieldName: 'attOneOnOneNote',
  },
];
