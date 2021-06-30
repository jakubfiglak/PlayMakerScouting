import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { UserBasicInfo } from '../../types/users';

type Props = {
  id?: string;
  usersData: UserBasicInfo[];
  label: string;
  size?: 'medium' | 'small';
};

export const UsersCombo = ({ usersData, label, size, id = 'user' }: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField(id);

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id={id}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={['', ...usersData.map((user) => user.id)]}
      getOptionLabel={(option) => {
        const user = usersData.find((p) => p.id === option);
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
