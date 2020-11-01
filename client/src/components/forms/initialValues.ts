import { Address } from '../../types/common';
import {
  RegisterFormData,
  EditAccountData,
  LoginFormData,
  UpdatePasswordData,
} from '../../types/auth';
import { PlayersFormData } from '../../types/players';
import { ClubsFormData } from '../../types/clubs';
import { MatchesFormData } from '../../types/matches';
import { OrderFormData } from '../../types/orders';
import { formatDateObject } from '../../utils';

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
  phone: '',
  address: {
    street: '',
    streetNo: '',
    zipCode: '',
    city: '',
    voivodeship: '',
    country: 'Polska',
  },
  activeRadius: 0,
  password: '',
  passwordConfirm: '',
};

export const editAccountInitialValues: EditAccountData = {
  phone: '',
  activeRadius: 0,
  address: initialAddress,
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
