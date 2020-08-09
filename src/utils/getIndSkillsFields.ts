import {
  cbIndSkillsFields,
  fbIndSkillsFields,
  mIndSkillsFields,
  fIndSkillsFields,
} from '../data/individualSkillsFields';
import { Position } from '../types/players';

export const getIndSkillsFields = (position: Position) => {
  switch (position) {
    case 'CB':
      return cbIndSkillsFields;
    case 'FB':
      return fbIndSkillsFields;
    case 'CM':
    case 'WM':
      return mIndSkillsFields;
    case 'F':
      return fIndSkillsFields;
    default:
      return [];
  }
};
