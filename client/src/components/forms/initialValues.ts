import { Address } from '../../types/common';
import {
  RegisterFormData,
  EditAccountData,
  LoginFormData,
  UpdatePasswordData,
} from '../../types/auth';
import { PlayersFormData, GrantAccessFormData } from '../../types/players';
import { ClubsFormData } from '../../types/clubs';
import { MatchesFormData } from '../../types/matches';
import { OrderFormData } from '../../types/orders';
import { ReportFormData } from '../../types/reports';
import { formatDateObject } from '../../utils';
import { AssignPlaymakerRoleData } from '../../types/users';

const initialAddress: Address = {
  street: '',
  streetNo: '',
  zipCode: '',
  city: '',
  voivodeship: '',
  country: 'Polska',
};

export const loginFormInitialValues: LoginFormData = {
  email: '',
  password: '',
};

export const updatePasswordInitialValues: UpdatePasswordData = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export const registerFormInitialValues: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const editAccountInitialValues: EditAccountData = {
  firstName: '',
  lastName: '',
  city: '',
  voivodeship: '',
  phone: '',
  activeRadius: 0,
};

export const playersFormInitialValues: PlayersFormData = {
  firstName: '',
  lastName: '',
  club: '',
  position: 'CM',
  dateOfBirth: '2000-01-01',
  height: 0,
  weight: 0,
  footed: 'R',
  lnpID: '',
  lnpProfileURL: '',
};

export const clubsFormInitialValues: ClubsFormData = {
  name: '',
  division: '',
  address: initialAddress,
};

export const matchesFormInitialValues: MatchesFormData = {
  homeTeam: '',
  awayTeam: '',
  competition: '',
  date: formatDateObject(new Date()),
};

export const ordersFormInitialValues: OrderFormData = {
  player: '',
  notes: '',
};

export const reportsFormInitialValues: ReportFormData = {
  order: '',
  player: '',
  match: '',
  minutesPlayed: 0,
  goals: 0,
  assists: 0,
  yellowCards: 0,
  redCards: 0,
  individualSkills: {
    ballReception: {
      rating: 1,
      note: '',
    },
    holdPass: {
      rating: 1,
      note: '',
    },
    gainPass: {
      rating: 1,
      note: '',
    },
    keyPass: {
      rating: 1,
      note: '',
    },
    defOneOnOne: {
      rating: 1,
      note: '',
    },
    airPlay: {
      rating: 1,
      note: '',
    },
    positioning: {
      rating: 1,
      note: '',
    },
    attOneOnOne: {
      rating: 1,
      note: '',
    },
    finishing: {
      rating: 1,
      note: '',
    },
  },
  teamplaySkills: {
    attack: {
      rating: 1,
      note: '',
    },
    defense: {
      rating: 1,
      note: '',
    },
    transition: {
      rating: 1,
      note: '',
    },
  },
  motorSkills: {
    leading: '',
    neglected: '',
  },
  summary: '',
  finalRating: 1,
};

export const grantAccessFormInitialValues: GrantAccessFormData = {
  user: '',
  player: '',
};

export const assignPlaymakerRoleFormInitialValues: AssignPlaymakerRoleData = {
  user: '',
};
