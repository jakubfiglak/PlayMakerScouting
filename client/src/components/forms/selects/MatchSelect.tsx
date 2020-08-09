import React from 'react';
// MUI components
import { Select, MenuItem, InputLabel, SelectProps } from '@material-ui/core';
// Types
import { Match } from '../../../types/matches';
// Utils & data
import { formatDate } from '../../../utils';

type MatchSelectProps = {
  matchesData: Match[];
} & SelectProps;

export const MatchSelect = ({
  matchesData,
  onChange,
  value,
  required,
  id,
  label,
}: MatchSelectProps) => {
  return (
    <>
      <InputLabel id={id || 'match'}>{label || 'Mecz'}</InputLabel>
      <Select
        labelId={id || 'match'}
        id={id || 'match'}
        label={label || 'Mecz'}
        name={id || 'match'}
        onChange={onChange}
        value={value}
        required={required}
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
    </>
  );
};
