import { IndividualSkillsStepProps } from '../types/reportProps';

type Field = {
  title: string;
  radioName: keyof IndividualSkillsStepProps;
  textFieldName: keyof IndividualSkillsStepProps;
};

export const commonFields: Field[] = [
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
