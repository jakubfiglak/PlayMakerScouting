import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { ClubData } from '../../../types/simplifiedData';

type Props = {
  clubsData: ClubData[];
  name: string;
  label: string;
  size?: 'medium' | 'small';
};

export const ClubsCombo = ({ clubsData, name, label, size }: Props) => {
  const [field, fieldMeta, fieldHelpers] = useField(name);

  const { value } = field;
  const { error, touched } = fieldMeta;
  const { setValue } = fieldHelpers;

  return (
    <Autocomplete
      id={name}
      {...field}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      value={value}
      options={clubsData.map((club) => club._id)}
      getOptionLabel={(option) => {
        const club = clubsData.find((c) => c._id === option);
        if (club) {
          return club.name;
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
