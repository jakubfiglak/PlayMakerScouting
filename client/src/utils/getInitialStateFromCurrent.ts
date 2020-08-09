import {
  Report,
  ReportFormData,
  IndividualSkills,
  TeamplaySkills,
} from '../types/reports';
import { indSkillsInitialState, teamplaySkillsInitialState } from '../data';

export const getInitialStateFromCurrent = (current: Report): ReportFormData => {
  const {
    order,
    player,
    match,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    summary,
    finalRating,
    individualSkills,
    teamplaySkills,
    motorSkills,
  } = current;

  let initialState: ReportFormData = {
    order,
    player: player._id,
    match: match._id,
    minutesPlayed,
    goals,
    assists,
    yellowCards,
    redCards,
    summary,
    finalRating,
    ...indSkillsInitialState,
    ...teamplaySkillsInitialState,
    leading: motorSkills.leading,
    neglected: motorSkills.neglected,
  };

  Object.keys(individualSkills).forEach((key) => {
    const formKey = key as keyof IndividualSkills;
    const ratingKey = `${key}Rating` as keyof ReportFormData;
    const noteKey = `${key}Note` as keyof ReportFormData;

    initialState = {
      ...initialState,
      [ratingKey]: individualSkills[formKey].rating,
      [noteKey]: individualSkills[formKey].note,
    };
  });

  Object.keys(teamplaySkills).forEach((key) => {
    const formKey = key as keyof TeamplaySkills;
    const ratingKey = `${key}Rating` as keyof ReportFormData;
    const noteKey = `${key}Note` as keyof ReportFormData;

    initialState = {
      ...initialState,
      [ratingKey]: teamplaySkills[formKey].rating,
      [noteKey]: teamplaySkills[formKey].note,
    };
  });

  return initialState;
};
