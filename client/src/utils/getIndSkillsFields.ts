import { Position } from '../types/players';

const cbIndSkillsFields = [
  {
    title: 'Gra 1v1 w obronie',
    namespace: 'defOneOnOne',
  },
  {
    title: 'Gra w powietrzu',
    namespace: 'airPlay',
  },
  {
    title: 'Ustawianie się',
    namespace: 'positioning',
  },
];

const fbIndSkillsFields = [
  {
    title: 'Gra 1v1 w obronie',
    namespace: 'defOneOnOne',
  },
  {
    title: 'Gra 1v1 w ataku',
    namespace: 'attOneOnOne',
  },
  {
    title: 'Gra w powietrzu',
    namespace: 'airPlay',
  },
];

const mIndSkillsFields = [
  {
    title: 'Finalizacja akcji',
    namespace: 'finishing',
  },
  {
    title: 'Gra 1v1 w ataku',
    namespace: 'attOneOnOne',
  },
  {
    title: 'Gra 1v1 w obronie',
    namespace: 'defOneOnOne',
  },
];

const fIndSkillsFields = [
  {
    title: 'Finalizacja akcji',
    namespace: 'finishing',
  },
  {
    title: 'Gra w powietrzu',
    namespace: 'airPlay',
  },
  {
    title: 'Gra 1v1 w ataku',
    namespace: 'attOneOnOne',
  },
];

export const getIndSkillsFields = (position: Position) => {
  switch (position) {
    case 'CB':
      return cbIndSkillsFields;
    case 'RB':
    case 'LB':
    case 'RWB':
    case 'LWB':
      return fbIndSkillsFields;
    case 'CM':
    case 'DM':
    case 'CAM':
    case 'RW':
    case 'LW':
      return mIndSkillsFields;
    case 'F':
      return fIndSkillsFields;
    default:
      return [];
  }
};
