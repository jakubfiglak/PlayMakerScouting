import { PlayersFormData } from '../../types/players';
import { ClubsFormData } from '../../types/clubs';

export const playersFormInitialValues: PlayersFormData = {
  firstName: '',
  lastName: '',
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

export const clubsFormInitialValues: ClubsFormData = {
  name: '',
  division: '',
  voivodeship: '',
  lnpID: '',
};
