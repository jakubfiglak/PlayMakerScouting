import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { Division } from '../../types/clubs';

const divisions: Division[] = [
  'Ekstraklasa',
  'I liga',
  'II liga',
  'III liga',
  'IV liga',
  'Klasa okręgowa',
  'Klasa A',
  'Klasa B',
  'Klasa C',
  'CLJ',
  'Rozgrywki juniorskie',
];

type Props = {
  size?: 'small' | 'medium';
};

export const DivisionSelect = ({ size }: Props) => {
  const [field, meta] = useField('division');

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="division">Poziom rozgrywkowy</InputLabel>
      <Select
        {...field}
        labelId="division"
        label="Poziom rozgrywkowy"
        error={touched && !!error}
      >
        <MenuItem value="">
          <em>Brak</em>
        </MenuItem>
        {divisions.map((div) => {
          return (
            <MenuItem key={div} value={div}>
              {div}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
