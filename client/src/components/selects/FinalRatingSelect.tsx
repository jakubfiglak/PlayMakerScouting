import { useField } from 'formik';
// MUI components
import {
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
// Utils & data
import { ratingDescriptions } from '../../utils/constants';
import { getLabel } from '../../utils/getLabel';

type Props = { name?: string; label?: string; helperText?: string };

export const FinalRatingSelect = ({
  name = 'rating',
  label = 'Ocena',
  helperText,
}: Props) => {
  const [field, fieldMeta] = useField(name);

  const { error, touched } = fieldMeta;

  return (
    <>
      <InputLabel id="rating">Ocena</InputLabel>
      <Select
        {...field}
        labelId="rating"
        id="rating"
        label={label}
        error={touched && !!error}
      >
        <MenuItem value="all">Wszystkie</MenuItem>
        {ratingDescriptions.map((rating) => (
          <MenuItem value={rating} key={rating}>
            {getLabel(rating)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </>
  );
};
