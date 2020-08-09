import { Competition } from '../types/matches';

export const getChipColor = (competition: Competition) => {
  if (competition === 'league') {
    return 'primary';
  }
  if (competition === 'cup') {
    return 'secondary';
  }
};
