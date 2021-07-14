import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
// Utils & data
import { positions } from '../../utils/constants';
import { getLabel } from '../../utils/getLabel';

type Props = { name?: string; label?: string; helperText?: string };

export const PositionSelect = ({
  name = 'position',
  label = 'Pozycja',
  helperText,
}: Props) => {
  const [field, fieldMeta] = useField(name);

  const { error, touched } = fieldMeta;

  return (
    <>
      <InputLabel id="position">Pozycja</InputLabel>
      <Select
        {...field}
        labelId="position"
        id="position"
        label={label}
        error={touched && !!error}
      >
        {positions.map((position) => (
          <MenuItem value={position} key={position}>
            {getLabel(position)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
