import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { groups } from '../../utils/constants';

type Props = {
  size?: 'small' | 'medium';
};

export const GroupSelect = ({ size }: Props) => {
  const [field, meta] = useField('group');

  const { error, touched } = meta;

  return (
    <FormControl variant="outlined" fullWidth size={size}>
      <InputLabel id="group">Grupa</InputLabel>
      <Select
        {...field}
        labelId="group"
        label="Grupa"
        error={touched && !!error}
      >
        <MenuItem value={undefined}>
          <em>Brak</em>
        </MenuItem>
        {groups.map((group) => {
          return (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          );
        })}
      </Select>
      {touched && error ? (
        <FormHelperText>{error}</FormHelperText>
      ) : (
        <FormHelperText>Pole opcjonalne</FormHelperText>
      )}
    </FormControl>
  );
};
