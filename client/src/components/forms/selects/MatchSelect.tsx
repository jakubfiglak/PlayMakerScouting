import React from 'react';
import { useField } from 'formik';
// MUI components
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
// Types
import { Match } from '../../../types/matches';
// Utils & data
import { formatDate } from '../../../utils';

type Props = {
  matchesData: Match[];
  name: string;
};

export const MatchSelect = ({ matchesData, name }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="match">Mecz</InputLabel>
      <Select
        {...field}
        labelId="match"
        label="Mecz"
        error={touched && !!error}
      >
        {matchesData.map((matchData) => {
          const { _id, homeTeam, awayTeam, date } = matchData;

          return (
            <MenuItem key={_id} value={_id}>
              {`${homeTeam.name} vs. ${awayTeam.name} (${formatDate(
                date,
                true,
              )})`}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
