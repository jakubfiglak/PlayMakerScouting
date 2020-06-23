export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  address: string;
  activeRadius: number;
  password: string;
  passwordConfirm: string;
};
