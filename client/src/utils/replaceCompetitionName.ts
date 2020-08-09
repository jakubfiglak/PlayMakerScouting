import { competitions } from '../data';
import { Competition } from '../types/matches';

export const replaceCompetitionName = (competition: Competition) => {
  const competitionObj = competitions.find(
    (comp) => comp.value.toLowerCase() === competition.toLowerCase(),
  );
  return competitionObj?.label;
};
