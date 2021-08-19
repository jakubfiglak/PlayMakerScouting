import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Types
import { MatchBasicInfo } from '../../types/matches';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { formatDate } from '../../utils/dates';

type Props = {
  matchesData: MatchBasicInfo[];
  name?: string;
  label?: string;
  size?: 'medium' | 'small';
};

export const MatchesCombo = ({
  matchesData,
  name = 'match',
  label = 'Mecz',
  size,
}: Props) => {
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
      options={['', ...matchesData.map((match) => match.id)]}
      getOptionLabel={(option) => {
        const match = matchesData.find((m) => m.id === option);
        if (match) {
          return `${match.homeTeam.name} - ${match.awayTeam.name} (${getLabel(
            match.competition,
          )}, ${formatDate(match.date)})`;
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
