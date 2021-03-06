import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

const voivodeships = [
  'Dolnośląskie',
  'Kujawsko-Pomorskie',
  'Lubelskie',
  'Lubuskie',
  'Łódzkie',
  'Mazowieckie',
  'Małopolskie',
  'Opolskie',
  'Podkarpackie',
  'Podlaskie',
  'Pomorskie',
  'Śląskie',
  'Świętokrzyskie',
  'Warmińsko-Mazurskie',
  'Wielkopolskie',
  'Zachodniopomorskie',
];

type VoivodeshipSelectProps = { size?: 'small' | 'medium'; name: string };

export const VoivodeshipSelect = ({ name, size }: VoivodeshipSelectProps) => {
  const [field, meta] = useField(name);

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="voivodeship">Województwo</InputLabel>
      <Select
        {...field}
        labelId="voivodeship"
        label="Województwo"
        name={name}
        error={touched && !!error}
      >
        <MenuItem value="">
          <em>Brak</em>
        </MenuItem>
        {voivodeships.map((voivodeship) => {
          return (
            <MenuItem key={voivodeship} value={voivodeship}>
              {voivodeship}
            </MenuItem>
          );
        })}
        <MenuItem value="Zagranica">Inne/Zagranica</MenuItem>
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
