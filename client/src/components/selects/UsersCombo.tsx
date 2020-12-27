import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { UserData } from '../../types/simplifiedData';

type Props = {
  usersData: UserData[];
  label: string;
  size?: 'medium' | 'small';
};

export const UsersCombo = ({ usersData, label, size }: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField('user');

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id="user"
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={['', ...usersData.map((user) => user._id)]}
      getOptionLabel={(option) => {
        const user = usersData.find((p) => p._id === option);
        if (user) {
          const { email, role } = user;
          return `${email} (${role})`;
        }
        return '';
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error}
        />
      )}
      size={size}
    />
  );
};
