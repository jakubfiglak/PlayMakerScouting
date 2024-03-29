import { PlayerDTO } from '../../types/players';
import { ClubDTO } from '../../types/clubs';

export const playersFormInitialValues: PlayerDTO = {
  firstName: '',
  lastName: '',
  country: 'PL',
  club: '',
  position: 'CM',
  yearOfBirth: 2000,
  height: 0,
  weight: 0,
  footed: 'R',
  lnpID: '',
  lnpProfileURL: '',
  minut90ProfileURL: '',
  transfermarktProfileURL: '',
};

export const clubsFormInitialValues: ClubDTO = {
  name: '',
  country: 'PL',
  division: '',
  group: null,
  voivodeship: '',
  lnpID: '',
};
