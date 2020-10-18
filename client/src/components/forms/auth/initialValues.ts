import { RegisterFormData, EditAccountData } from '../../../types/auth';

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
  address: {
    street: '',
    streetNo: '',
    zipCode: '',
    city: '',
    voivodeship: '',
    country: 'Polska',
  },
};
