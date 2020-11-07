import { RatingScore } from '../types/reports';

export const getRatingChipLabel = (rating: RatingScore) => {
  switch (rating) {
    case 1:
      return 'Selekcja negatywna';
    case 2:
      return 'Jeszcze nie wiem';
    case 3:
      return 'Do obserwacji';
    case 4:
      return 'Selekcja pozytywna';
    default:
      return 'Do obserwacji';
  }
};
