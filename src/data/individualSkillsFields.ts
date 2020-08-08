import { IndSkillsFormData } from '../types/reports';

export type SkillsField = {
  title: string;
  radioName: keyof IndSkillsFormData;
  textFieldName: keyof IndSkillsFormData;
};

export const commonIndSkillsFields: SkillsField[] = [
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

export const cbIndSkillsFields: SkillsField[] = [
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

export const fbIndSkillsFields: SkillsField[] = [
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

export const mIndSkillsFields: SkillsField[] = [
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

export const fIndSkillsFields: SkillsField[] = [
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
