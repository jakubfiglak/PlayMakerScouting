import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export const RoleSelect = () => {
  const [field, fieldMeta] = useField('role');

  const { error, touched } = fieldMeta;

  return (
    <>
      <InputLabel id="role">Rola</InputLabel>
      <Select
        {...field}
        labelId="role"
        id="role"
        label="Rola"
        error={touched && !!error}
      >
        <MenuItem value="">wszystkie</MenuItem>
        <MenuItem value="scout">scout</MenuItem>
        <MenuItem value="playmaker-scout">playmaker-scout</MenuItem>
        <MenuItem value="admin">admin</MenuItem>
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
