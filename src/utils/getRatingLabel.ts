import { skills } from '../data';

export const getRatingLabel = (rating: string) => {
  const label = skills.find((rate) => rate.value === rating)?.label;

  if (!label) {
    return 'Nieznany parametr';
  }

  return label;
};
