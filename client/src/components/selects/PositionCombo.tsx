import { useField } from 'formik';
// MUI components
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
// Utils & data
import { getLabel } from '../../utils/getLabel';
import { positions } from '../../utils/constants';

type Props = {
  name?: string;
  label?: string;
  size?: 'medium' | 'small';
  helperText?: string;
};

export const PositionCombo = ({
  name = 'position',
  label = 'Pozycja',
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
      options={[...positions]}
      getOptionLabel={(option) => getLabel(option) || 'brak'}
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
