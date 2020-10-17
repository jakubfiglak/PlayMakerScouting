import { RegisterFormData } from '../../../types/auth';

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
