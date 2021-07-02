import React from 'react';
import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { Team } from '../../types/teams';

type Props = {
  teamsData: Team[];
  name: string;
  label: string;
  size?: 'medium' | 'small';
};

export const TeamsCombo = ({ teamsData, name, label, size }: Props) => {
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
      options={['', ...teamsData.map((team) => team.id)]}
      getOptionLabel={(option) => {
        const team = teamsData.find((t) => t.id === option);
        if (team) {
          return team.name;
        }
        return 'brak';
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
