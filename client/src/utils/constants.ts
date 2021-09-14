import { SkillsCategories } from '../types/ratings';

export const positions = [
  'GK',
  'LB',
  'RB',
  'CB',
  'CBL',
  'CBR',
  'CBM',
  'LW',
  'LWB',
  'RW',
  'RWB',
  'DM',
  'DM/CM',
  'CM',
  'CM/CAM',
  'CAM',
  'LM',
  'RM',
  'RM/LM',
  'RW/LW',
  'CAM/F',
  'F',
  'F/W',
] as const;

export const divisions = [
  'Ekstraklasa',
  'I liga',
  'II liga',
  'III liga',
  'IV liga',
  'Klasa okręgowa',
  'Klasa A',
  'Klasa B',
  'Klasa C',
  'CLJ',
  'Rozgrywki juniorskie',
  'Inny/zagranica',
] as const;

export const skillsCategories: SkillsCategories[] = [
  'individual',
  'teamplay',
  'defense',
  'offense',
  'mental',
  'physical',
];

export const groups = [
  'Grupa 1',
  'Grupa 2',
  'Grupa 3',
  'Grupa 4',
  'Grupa 5',
  'Grupa 6',
  'Grupa 7',
  'Grupa 8',
  'Grupa 9',
  'Grupa 10',
  'Grupa 11',
  'Grupa 12',
  'Grupa 13',
  'Grupa 14',
  'Grupa A',
  'Grupa B',
  'Grupa C',
  'Grupa D',
  'Grupa I',
  'Grupa II',
  'Grupa III',
  'Grupa IV',
  'Południe',
  'Północ',
  'Wschód',
  'Zachód',
] as const;
