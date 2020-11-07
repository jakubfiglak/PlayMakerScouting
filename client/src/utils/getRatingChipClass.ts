import { RatingScore } from '../types/reports';

export const getRatingChipClass = (
  rating: RatingScore,
  classes: Record<
    'delete' | 'accept' | 'negative' | 'unknown' | 'observe' | 'positive',
    string
  >,
) => {
  switch (rating) {
    case 1:
      return classes.negative;
    case 2:
      return classes.unknown;
    case 3:
      return classes.observe;
    case 4:
      return classes.positive;
    default:
      return classes.unknown;
  }
};
