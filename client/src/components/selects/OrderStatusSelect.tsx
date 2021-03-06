import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';

type Props = {
  size?: 'small' | 'medium';
  isOpenOptionDisabled?: boolean;
};

export const OrderStatusSelect = ({ size, isOpenOptionDisabled }: Props) => {
  const [field, meta] = useField('status');

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="status">Status</InputLabel>
      <Select
        {...field}
        labelId="status"
        id="status"
        label="Status"
        error={touched && !!error}
      >
        <MenuItem value="all">Wszystkie</MenuItem>
        <MenuItem value="open" disabled={isOpenOptionDisabled}>
          Otwarte
        </MenuItem>
        <MenuItem value="accepted">Przyjęte do realizacji</MenuItem>
        <MenuItem value="closed">Zamknięte</MenuItem>
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
