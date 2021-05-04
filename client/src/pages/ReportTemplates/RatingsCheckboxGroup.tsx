import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@material-ui/core';
import { useField } from 'formik';
import { Rating } from '../../types/ratings';
import { useRatings } from '../../operations/queries/useRatings';

// type Props = { ratings: Rating[] };

export const RatingsCheckboxGroup = () => {
  const [field, fieldMeta] = useField('ratings');
  const { data: ratings } = useRatings();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Oceniane umiejętności</FormLabel>
      <FormGroup>
        {ratings
          ? ratings.map((rating) => (
              <FormControlLabel
                key={rating.id}
                control={<Checkbox {...field} />}
                label={`${rating.name} (${rating.category})`}
              />
            ))
          : null}
      </FormGroup>
      <FormHelperText>Be careful</FormHelperText>
    </FormControl>
  );
};
