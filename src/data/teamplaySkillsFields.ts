import { TeamplaySkillsField } from '../types/reports';

export const teamplaySkillsFields: TeamplaySkillsField[] = [
  {
    title: 'Udział w ataku',
    radioName: 'attackRating',
    textFieldName: 'attackNote',
  },
  {
    title: 'Praca w obronie',
    radioName: 'defenseRating',
    textFieldName: 'defenseNote',
  },
  {
    title: 'Fazy przejściowe',
    radioName: 'transitionRating',
    textFieldName: 'transitionNote',
  },
];
