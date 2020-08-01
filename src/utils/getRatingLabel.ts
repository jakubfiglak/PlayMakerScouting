import { individualSkills, teamplaySkills, motorSkills } from '../data';

export const getRatingLabel = (
  rating: string,
  type: 'individual' | 'teamplay' | 'motor',
) => {
  switch (type) {
    case 'individual':
      return individualSkills.find((rate) => rate.value === rating)?.label;
    case 'teamplay':
      return teamplaySkills.find((rate) => rate.value === rating)?.label;
    case 'motor':
      return motorSkills.find((rate) => rate.value === rating)?.label;

    default:
      return 'default';
  }
};
