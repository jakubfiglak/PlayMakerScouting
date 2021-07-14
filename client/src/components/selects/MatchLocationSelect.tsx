import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

type Props = {
  name: string;
  size?: 'small' | 'medium';
};

const matchLocations = [
  {
    value: 'home',
    label: 'dom',
  },
  {
    value: 'away',
    label: 'wyjazd',
  },
];

export const MatchLocationSelect = ({ name, size }: Props) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="location">Dom/wyjazd</InputLabel>
      <Select
        {...field}
        labelId="location"
        id="location"
        label="Dom/wyjazd"
        error={touched && !!error}
      >
        {matchLocations.map((location) => (
          <MenuItem value={location.value} key={location.value}>
            {location.label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
