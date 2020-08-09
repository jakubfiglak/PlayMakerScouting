import {
  ReportFormData,
  IndSkillsFormData,
  TeamplaySkillsFormData,
  MotorSkillsFormData,
} from '../types/reports';

export const indSkillsInitialState: IndSkillsFormData = {
  ballReceptionRating: 1,
  ballReceptionNote: '',
  holdPassRating: 1,
  holdPassNote: '',
  gainPassRating: 1,
  gainPassNote: '',
  keyPassRating: 1,
  keyPassNote: '',
  defOneOnOneRating: 0,
  defOneOnOneNote: '',
  airPlayRating: 0,
  airPlayNote: '',
  positioningRating: 0,
  positioningNote: '',
  attOneOnOneRating: 0,
  attOneOnOneNote: '',
  finishingRating: 0,
  finishingNote: '',
};

export const teamplaySkillsInitialState: TeamplaySkillsFormData = {
  attackRating: 1,
  attackNote: '',
  defenseRating: 1,
  defenseNote: '',
  transitionRating: 1,
  transitionNote: '',
};

export const motorSkillsInitialState: MotorSkillsFormData = {
  leading: '',
  neglected: '',
};

export const reportFormInitialState: ReportFormData = {
  order: '',
  player: '',
  match: '',
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  ...indSkillsInitialState,
  ...teamplaySkillsInitialState,
  ...motorSkillsInitialState,
  summary: '',
  finalRating: 1,
};
