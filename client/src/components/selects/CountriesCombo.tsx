import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Utils & data
import { countries, getCountryName } from '../../utils/countries';

type Props = {
  name?: string;
  label?: string;
  size?: 'medium' | 'small';
  helperText?: string;
};

export const CountriesCombo = ({
  name = 'country',
  label = 'Kraj',
  size,
  helperText,
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
      options={[...Object.keys(countries)]}
      getOptionLabel={(option) => getCountryName(option) || 'brak'}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          error={touched && !!error}
          helperText={touched && error ? error : helperText}
        />
      )}
      size={size}
    />
  );
};
